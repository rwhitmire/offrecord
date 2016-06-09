import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

class ImagePreview extends Component {
  componentDidMount() {
    const node = findDOMNode(this)
    if(!node) return

    const img = node.querySelector('img')

    img.onload = () => {
      this.props.onHeightChange()
    }
  }

  render() {
    if(!this.props.text) return null
    const matches = this.props.text.match(/(http|HTTP|https|HTTPS):\/\/.*\.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF)([^\s]+|\b)/g)

    if(!matches || !matches.length) return null
    const url = matches[0]

    return(
      <div className="image-preview">
        <a href={url} target="blank">
          <img src={url} />
        </a>
      </div>
    )
  }
}

export default ImagePreview
