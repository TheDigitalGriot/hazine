"""Read the authored PDF composition as syntax; never execute the PDF generator.

Called by tests/component-pages.test.mjs to enforce complete delivered-section coverage.
Outputs JSON to stdout, so callers decide where a verified content snapshot belongs.
"""
import ast
import hashlib
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

source = Path(sys.argv[1])
raw = source.read_bytes()
tree = ast.parse(raw.decode('utf-8-sig'))
sections = []
bindings = {'mm': 1, 'ASSETS': 'brand', 'ICON_CROP': 'approved-icon-region', 'doc.width': 170}

def evaluate(node):
    if isinstance(node, ast.Constant): return node.value
    if isinstance(node, ast.Name): return bindings[node.id]
    if isinstance(node, ast.Attribute): return bindings.get(ast.unparse(node), 170)
    if isinstance(node, (ast.List, ast.Tuple)): return [evaluate(item) for item in node.elts]
    if isinstance(node, ast.BinOp):
        left, right = evaluate(node.left), evaluate(node.right)
        if isinstance(node.op, ast.Add): return left + right
        if isinstance(node.op, ast.Mult): return left * right
        if isinstance(node.op, ast.Div): return left + '/' + right
    if isinstance(node, ast.JoinedStr):
        return ''.join(format(evaluate(part.value), evaluate(part.format_spec) if part.format_spec else '') if isinstance(part, ast.FormattedValue) else part.value for part in node.values)
    if isinstance(node, ast.ListComp):
        generator = node.generators[0]
        result = []
        for values in evaluate(generator.iter):
            for target, value in zip(generator.target.elts, values): bindings[target.id] = value
            result.append(evaluate(node.elt))
        return result
    if isinstance(node, ast.Call):
        name = ast.unparse(node.func)
        if name == 'enumerate': return list(enumerate(evaluate(node.args[0]), evaluate(node.args[1]) if len(node.args) > 1 else 0))
        if name == 'P':
            return {'type': 'text', 'text': evaluate(node.args[0]), 'style': evaluate(node.args[1]) if len(node.args) > 1 else 'BodyX', 'line': node.lineno}
        if name == 'table': return {'type': 'table', 'rows': evaluate(node.args[0]), 'line': node.lineno}
        if name == 'Diagram': return {'type': 'diagram', 'kind': evaluate(node.args[0]), 'line': node.lineno}
        if name == 'fit_image': return {'type': 'image', 'asset': evaluate(node.args[0]), 'line': node.lineno}
        if name in ('Spacer', 'PageBreak'): return None
    raise ValueError(f'Unsupported authored composition at line {getattr(node, "lineno", "?")}: {ast.dump(node)}')

for node in tree.body:
    if node.lineno < 172: continue
    if isinstance(node, ast.Expr) and isinstance(node.value, ast.Call) and ast.unparse(node.value.func) == 'section':
        args = [evaluate(item) for item in node.value.args]
        sections.append({'label': args[0], 'title': args[1], 'line': node.lineno, 'blocks': []})
        if len(args) > 2: sections[-1]['blocks'].append({'type': 'text', 'text': args[2], 'style': 'BodyX', 'line': node.lineno})
    elif isinstance(node, ast.Assign) and any(isinstance(target, ast.Name) and target.id in ('wm', 'lock', 'criteria') for target in node.targets):
        bindings[node.targets[0].id] = evaluate(node.value)
    elif isinstance(node, ast.AugAssign) and isinstance(node.target, ast.Name) and node.target.id == 'story':
        sections[-1]['blocks'].extend(block for block in evaluate(node.value) if block is not None)

assert len(sections) == 22, f'Unexpected delivered section count {len(sections)}'
print(json.dumps({'source': str(source), 'sha256': hashlib.sha256(raw).hexdigest(), 'sections': sections}, ensure_ascii=False))
