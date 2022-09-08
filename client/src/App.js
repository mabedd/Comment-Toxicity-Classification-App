import { useState } from 'react'
import './App.css'
import axios from 'axios'

import { Box, Button, Typography, TextField, Grid, CircularProgress, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

// MUI Custom Text Field
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  'input': {
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#9c27b0',
  },
  "& .MuiFormLabel-root": {
    color: 'white'
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: 'white'
  },
  '& .MuiInputBase-root': {
    color: 'white'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#9c27b0',
    },
    '&:hover fieldset': {
      borderColor: '#9c27b0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9c27b0',
    },
  },

});

function App() {

  // Initial States
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [text, setText] = useState('')
  const [prediction, setPrediction] = useState('')

  // Call backend for prediction
  const submitHandler = async () => {
    try {
      setLoading(true)

      // Send post request
      const { data } = await axios.post(`http://localhost:8000/predict/?text=${text}`)

      // Modify state
      setLoading(false)
      setPrediction(data)
      setText('')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography variant='h3' mt={4} color='white'>Comment Toxicity Classification</Typography>
        </Grid>
        {error && <p>Someting went wrong</p>}
        <Grid item xs={8} mt={6}>
          <CssTextField
            style={{ width: '500px' }}
            label="Enter Text"
            variant="outlined"
            color='secondary'
            multiline
            rows={4}
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          />
        </Grid>
        <Box mt={4}>
          {
            loading ? <CircularProgress mt={2} />
              :
              <Button
                variant='contained'
                color='secondary'
                onClick={submitHandler}
              >
                Predict
              </Button>
          }
        </Box>
        <Box>
          {prediction && <Typography variant='h4' color='white' mt={4} align='center'>Your Comment is:</Typography>}
          <Stack direction='row' spacing={2} mt={2}>
            {prediction ? Object.keys(prediction).map((key, index) => (
              <Typography variant='h5' color='orange' key={index}>
                {prediction[key] === 'true' ? <p>{key}</p> : null}
              </Typography>
            )) : null}
          </Stack>
        </Box>
      </Grid>
    </>
  );
}

export default App;
