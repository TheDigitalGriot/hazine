import { Component } from 'react'

export default class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { failed: true, error }
  }

  componentDidCatch(error) {
    console.error('Hazine scene failed to initialise', error)
  }

  retry = () => {
    this.setState({ failed: false, error: null })
  }

  render() {
    if (this.state.failed) {
      return typeof this.props.fallback === 'function'
        ? this.props.fallback({ error: this.state.error, retry: this.retry })
        : this.props.fallback
    }
    return this.props.children
  }
}
