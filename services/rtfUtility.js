import { Fragment } from 'react'
import Highlight from 'react-highlight'
import '../node_modules/highlight.js/styles/atom-one-dark.css'

const getContentFragment = (index, text, obj, type) => {
  let modifiedText = text

  if (obj) {
    if (obj.bold) {
      modifiedText = <b key={index}>{text}</b>
    }

    if (obj.italic) {
      modifiedText = <em key={index}>{text}</em>
    }

    if (obj.underline) {
      modifiedText = <u key={index}>{text}</u>
    }
    if (obj.code) {
      modifiedText = (
        <code
          style={{
            backgroundColor: '#f8f9fb',
            borderRadius: '3px',
            border: '1px solid #dcdcdc',
            padding: '0 3px',
          }}
          key={index}
        >
          {text}
        </code>
      )
    }
    if (obj.type === 'link') {
      modifiedText = (
        <a
          key={index}
          style={{ color: '#0000ee' }}
          rel='noreferrer'
          target='_blank'
          href={obj.href}
        >
          {obj.children[0].text}
        </a>
      )
    }
  }

  switch (type) {
    case 'heading-three':
      return (
        <h3 key={index} className='text-xl font-semibold mb-4'>
          {modifiedText.map((item, i) => (
            <Fragment key={i}>{item}</Fragment>
          ))}
        </h3>
      )
    case 'heading-five':
      return (
        <h5 key={index} className='text-xl font-semibold mb-4'>
          {modifiedText.map((item, i) => (
            <Fragment key={i}>{item}</Fragment>
          ))}
        </h5>
      )
    case 'paragraph':
      return (
        <p key={index} className='mb-8'>
          {modifiedText.map((item, i) => (
            <Fragment key={i}>{item}</Fragment>
          ))}
        </p>
      )
    case 'heading-four':
      return (
        <h4 key={index} className='text-md font-semibold mb-4'>
          {modifiedText.map((item, i) => (
            <Fragment key={i}>{item}</Fragment>
          ))}
        </h4>
      )
    case 'image':
      return (
        <img
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      )
    case 'code-block':
      return (
        <Fragment key={index}>
          {modifiedText.map((item, i) => (
            <Fragment key={i}>
              <Highlight>{item}</Highlight>
              <br />
            </Fragment>
          ))}
        </Fragment>
      )

    default:
      return modifiedText
  }
}

export default getContentFragment
