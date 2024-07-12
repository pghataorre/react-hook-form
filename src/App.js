
import './App.css';
import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';  
import { getUsers } from './api/getUsers/getUsers';
import { getFilms } from './api/getFilms/getFilms';

import SocialMediaFields from './Components/SocialMediaFields/SocialMediaFields';
import {
  Autocomplete,
  TextField
} from '@mui/material';
import {
  Controller
} from 'react-hook-form';



function App() {
  const defaultValues = {
    username: 'D',
    email:'D@S.COM',
    channel: 'SDS',
    dob: new Date(),
    social: [{
      id: `${crypto.randomUUID()}`,
      name: 'SD',
      url: 'SDS'
    }],
    film: ''
  }

  const [_, setUserResult] = useState(defaultValues);
  const [apiUSerData, setApiUserData] = useState([]);
  const [films, setFilms] = useState([]);
  const { register, control, handleSubmit, formState: {errors, isValid}, getValues, reset } = useForm(
    {
      defaultValues,
      mode: 'onChange'
    }
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'social'
  })

  useEffect(() => {
    (async () => {
      await getUsersItems()
      await getFilmsList();
    })();

    console.log('errors ======== ', errors);

  }, [errors]);

  const onSubmit = (data) => {
    const getVals = getValues('social')
    console.log('data ======== ', data);
    console.log('getVals ======== ', getVals);
  }

  const getUsersItems = async () => {
    const result = await getUsers();
    if (!result.error) {
      setApiUserData(result);
      setUserResult({username: result.name, email: result.email, channel: result.website});
    } else {
      console.log('error', result.error);
    }
  }

  const getFilmsList = async () => {
    const result = await getFilms();
    if (!result.error) {
      setFilms(result);
    } else {
      console.log('error', result.error);
    }
  }

  const resetFormField = () => {
    reset();
  }

  const deleteSocialMediaFields = (index) => {
    remove(index)
  }

  const addSocialMediaFields = () => {
    append({
      id: `${crypto.randomUUID()}`,
      name: '',
      url: ''
    })
  }


  return (
    <>
    <div className="App">
      <main>
        <h1>React FORM</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" {...register('username', {
              required:{
                value: true,
                message: 'Username is required'
              } 
            }) }/>
            <p className="error-message">{errors?.username?.message}</p>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" {...register('email', {
              required: {
                value: true,
                message:'Email is required'
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email'
              }, 
              validate: (fieldValue) => {
                return (fieldValue !== 'pghataorre@gmail.com' || 'Email should not contain permy')
              }
            })}/>
            <p className="error-message">{errors?.email?.message}</p>
          </div>
          <div>
            <label htmlFor="channel">Channel:</label>
              <input type="text" id="Channel" name="Channel"{...register('channel',{
                required:{
                  value: true,
                  message: 'Channel is required'
                } 
              })} />
            <p className="error-message">{errors?.channel?.message}</p>
          </div>
          <div>
            <label htmlFor="dob">Date of birth:</label>
              <input type="date" id="dob" name="dob"{...register('dob',{
                valueAsDate: true,
                required:{
                  value: true,
                  message: 'Channel is required'
                } 
              })} />
            <p className="error-message">{errors?.dob?.message}</p>
          </div>
          <h2>Social Media</h2>
          {
            fields.map((fields, index) => { 
              return (
                <SocialMediaFields 
                  fields={fields}
                  register={register}
                  errors={errors}
                  index={index}
                  deleteSocialMediaFields={deleteSocialMediaFields}
                  addSocialMediaFields={addSocialMediaFields}
                />
              )
            })
          }

          <div className="controller-example" >
            <Controller
              name = "film"
              control = {control}
              render = {
                ({field: {onChange,value}}) => {
                  return ( 
                    <Autocomplete 
                      value={value.uuid} // <--- MUST BE THE ID VALUE OF THE OBJECT
                      options = {films} // <--- MUST BE AN ARRAY DATA TO CREATE THE LIST
                      onChange = {(e, data) => onChange(data)} // <--- MUST ADD SO WHEN A SELECTION IS MADE IT SETS THE SELECTION E.G. TRIGGER AN EVENT TO UPDATE USEFORM
                      // // filterOptions={(options) => options}  // <--- OPTIONAL --- THE OPTIONS LIST CAN BE FILTERED DEPENDING ON VALUES IN THE FORM OR OTHER LOGIC. 
                      // getOptionLabel = {(option) => option.label || ''} // <--- OPTIONAL --- This prop is a function that defines how the label for each option should be displayed in the dropdown list. It takes an option object as a parameter and returns the label to be displayed.
                      renderOption = {
                        (props, option) => { // <--- MUST ADD SO THAT THE LIST THAT APPEARS IS CORRECT IN MARK-UP TERMS - WE'RE SAYING RENDER A LIST
                          return ( 
                            <li {...props} key = {crypto.randomUUID()} role = "list-box" > {option.label} </li>
                          );
                        }
                      }
                      renderInput = {
                        (params) => {
                          return ( 
                            <TextField className = "borderless-input" 
                            {...params}
                            label = "usernames"
                            onChange = {(e) => e.target.value}
                          />)}
                        }
                    />
                  )    
                }}
            />
          </div>

          <div>
            <button type="submit" disabled={!isValid}>Submit</button>
            <button type="button" onClick={() => resetFormField()}>Reset</button>
          </div>
        </form>
      </main>
    </div>
    <DevTool control={control}/>
    </>
  );
}

export default App;
