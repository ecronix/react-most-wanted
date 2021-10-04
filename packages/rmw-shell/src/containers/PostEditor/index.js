import React, { useCallback, useEffect, useState } from 'react'
import InputBase from '@mui/material/InputBase'
import Fab from '@mui/material/Fab'
import LinearProgress from '@mui/material/LinearProgress'
import Photo from '@mui/icons-material/Photo'
import Close from '@mui/icons-material/Close'
import Delete from '@mui/icons-material/Delete'
import ShortText from '@mui/icons-material/ShortText'
import TextFields from '@mui/icons-material/TextFields'
import ImportExport from '@mui/icons-material/ImportExport'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { makeStyles, createStyles, useTheme } from '@mui/material/styles'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const createObjectURL = (object) => {
  return window.URL
    ? window.URL.createObjectURL(object)
    : window.webkitURL.createObjectURL(object)
}

const grid = 8
let timerId = null

const getItemStyle = (isDragging, draggableStyle, { content }) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  paddingTop: grid * 2,
  paddingBottom: grid * 2,
  marginTop: grid / 2,
  marginBottom: grid / 2,
  alignSelf: content.type === 'image' ? 'center' : undefined,
  // change background colour if dragging
  //background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
})

const useStyles = makeStyles((theme) =>
  createStyles({
    image: {
      '&:hover': {
        boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
      },
    },
  })
)

const SimpleEditor = ({
  handleImageUpload,
  onStateChanged,
  onDefferedStateChange,
  delay = 2000,
  initialState = {},
}) => {
  const [isOpen, setOpen] = useState(false)
  //const [index, setIndex] = useState(0)
  const theme = useTheme()
  const classes = useStyles(theme)
  const [elements, changeElements] = useState([
    { type: 'text', fontSize: 30, title: true, noDelete: true },
    { type: 'text', description: true, noDelete: true },
  ])

  useEffect(() => {
    const { elements: e } = initialState
    if (e) {
      changeElements(e)
    }
  }, [initialState])

  const handleClose = () => {
    setOpen(false)
  }

  const dispatchChange = useCallback(
    (e) => {
      onStateChanged && onStateChanged({ elements: e })

      clearTimeout(timerId)
      timerId = setTimeout(
        () => onDefferedStateChange && onDefferedStateChange({ elements: e }),
        delay
      )
    },
    [onStateChanged, onDefferedStateChange, delay]
  )

  const setElements = (el) => {
    changeElements(el)
    dispatchChange(el)
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const e = reorder(elements, result.source.index, result.destination.index)

    setElements(e)
    dispatchChange(e)
    //setIndex(-1)
  }

  const handleAddImageClick = async (e) => {
    const file = e.target.files[0]
    handleClose()
    changeElements([
      ...elements,
      {
        type: 'image',
        downloadURL: null,
        previewURL: createObjectURL(file),
        isUploading: true,
      },
    ])

    const imageData = await handleImageUpload(file)
    const el = [
      ...elements,
      {
        type: 'image',
        ...imageData,
        previewURL: null,
        isUploading: null,
      },
    ]
    setElements(el)
    dispatchChange(el)
  }

  const handleAddTitleClick = () => {
    const e = [...elements, { type: 'text', fontSize: 30, marginTop: 30 }]
    setElements(e)
    handleClose(e)
  }

  const handleAddTextClick = () => {
    const e = [...elements, { type: 'text' }]
    setElements(e)
    handleClose(e)
  }

  const handleRemoveClick = (index) => {
    elements.splice(index, 1)
    setElements([...elements])
  }

  const actions = [
    {
      icon: (
        <React.Fragment>
          <input
            onChange={handleAddImageClick}
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Photo style={{ marginTop: 5 }} />
          </label>
        </React.Fragment>
      ),
      name: 'Photo',
    },
    {
      icon: <TextFields />,
      name: 'Title',
      onClick: handleAddTitleClick,
    },
    { icon: <ShortText />, name: 'Text', onClick: handleAddTextClick },
  ]

  const items = elements.map((e, i) => {
    return {
      id: `${e.type}_${i}`,
      content: e,
      index: i,
    }
  })

  const getItemContent = ({ content, index }) => {
    const { type } = content
    if (type === 'text') {
      const { fontSize = 15, marginTop, value = '' } = content
      return (
        <InputBase
          value={value}
          onChange={(e) => {
            const values = [...elements]
            values[index].value = e.target.value
            setElements(values)
          }}
          fullWidth
          onFocus={(e) => {
            //setIndex(index)
          }}
          style={{ fontSize, marginTop }}
          placeholder="Text eingeben"
          inputProps={{ 'aria-label': 'text' }}
          multiline
        />
      )
    }
    if (type === 'image') {
      const { downloadURL, previewURL, isUploading = false } = content
      return (
        <div style={{ padding: 0 }}>
          <img
            onClick={() => {
              //setIndex(index)
            }}
            className={classes.image}
            src={downloadURL || previewURL}
            alt="img"
            style={{
              maxWidth: '100vw',
              maxHeight: 438,
              alignSelf: 'center',
              margin: 0,
            }}
          />
          {isUploading && (
            <LinearProgress style={{ height: 6, margin: 0, marginTop: -5 }} />
          )}
        </div>
      )
    }
  }

  return (
    <React.Fragment>
      <Scrollbar>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    width: '100%',
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              item
                            )}
                          >
                            {getItemContent(item)}

                            {index === item.index && (
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Fab
                                  size="small"
                                  color="primary"
                                  style={{ margin: 8 }}
                                >
                                  <ImportExport />
                                </Fab>
                                <Fab
                                  size="small"
                                  color="secondary"
                                  style={{ margin: 8 }}
                                  disabled={elements[item.index].noDelete}
                                  onClick={() => handleRemoveClick(item.index)}
                                >
                                  <Delete />
                                </Fab>
                                <Fab
                                  size="small"
                                  color="secondary"
                                  style={{ margin: 8 }}
                                  onClick={() => {
                                    //setIndex(-1)
                                  }}
                                >
                                  <Close />
                                </Fab>
                              </div>
                            )}
                          </div>
                        )
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
      </Scrollbar>

      <SpeedDial
        disable={true}
        style={{ position: 'absolute', bottom: 15, right: 15 }}
        ariaLabel="SpeedDial example"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={() => setOpen(true)}
        open={isOpen}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </React.Fragment>
  )
}

export default SimpleEditor
