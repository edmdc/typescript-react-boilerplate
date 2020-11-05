import React, {useState} from 'react';
import {Idea} from '../App/App'

type Props = {
  submitIdea: (newIdea: Idea) => void
}

export default function IdeaForm({ submitIdea }: Props ): JSX.Element {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const clearInputs = () => {
    setTitle('')
    setContent('')
  }

  const createIdea = (event: React.FormEvent) => {
    event.preventDefault()
    const newIdea: Idea = {
      title,
      content,
      id: Date.now(),
    }
    submitIdea(newIdea)
    clearInputs()
  }

  return (
    <form
      onSubmit={(event) => {
        createIdea(event)
      }}
    >
      <label htmlFor='title'>
        Title:
      </label>
      <input
        type='text'
        placeholder='Title'
        value={title}
        name='title input'
        onChange={(event) => {
          setTitle(event.currentTarget.value)
        }}
      />
      <label htmlFor='content'>
        Content:
      </label>
      <input
        type='text'
        placeholder='Content'
        value={content}
        name='Content input'
        onChange={(event) => {
          setContent(event.currentTarget.value)
        }}
      />
      <button>
        Add Idea
      </button>
    </form>
  )
}
