
import './App.css';
import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';  
import { getUsers } from './api/getUsers/getUsers';

function App() {
  const defaultValues = {
    username: '',
    email:'',
    channel: '',
    dob: new Date(),
    social: [{
      id: `${crypto.randomUUID()}`,
      name: '',
      url: ''
    }]
  }

  const [userResult, setUserResult] = useState(defaultValues);
  const { register, control, handleSubmit, formState: {errors, isValid}, getValues, reset } = useForm(
    {
      defaultValues,
      mode: 'onChange'
    }
  );

console.log('errors =====         ===== ', errors);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'social'
  })


  useEffect(() => {
    console.log('errors =====         ===== ', errors);
    (async () => {await getUsersItems()})();

  }, []);

  const onSubmit = (data) => {
    const getVals = getValues('social')
    console.log('data ======== ', data);
    console.log('getVals ======== ', getVals);
  }

  const getUsersItems = async () => {
    const result = await getUsers(1);
    if (!result.error) {
      setUserResult({username: result.name, email: result.email, channel: result.website});
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

const SocialMediaFields = ({fields, register, errors, index, deleteSocialMediaFields, addSocialMediaFields}) => {
  const socialMediaNameField = `social.${index}.name`;
  const socialMediaUrlField = `social.${index}.url`;
  return (
    <div key={fields.id} className="social-media-fields">
      <div>
        <h3>{`Social media Entry ${index }`}</h3>
        <div>
          <label htmlFor="channel">Social Media name:</label>
            <input type="text" id={socialMediaNameField} name={socialMediaNameField} {...register(socialMediaNameField,{
              required:{
                value: true,
                message: 'Media name is required'
              } 
            })} />
            <p className="error-message">{errors?.social?.[index].name?.message}</p>
        </div>
        <div>
          <label htmlFor="channel">Social Media Url:</label>
            <input type="text" id={socialMediaUrlField} name={socialMediaUrlField} {...register(socialMediaUrlField,{
              required:{
                value: true,
                message: 'Media url is required'
              } 
            })} />
          <p className="error-message">{errors?.social?.[index].url?.message}</p>
        </div>
      </div>
      <div className="social-media-buttons">
        <button type="button" onClick={() => addSocialMediaFields(index)}>Add</button>
        {index !== 0 && (<button type="button" onClick={() => deleteSocialMediaFields(index)}>Delete</button>)}
      </div>
    </div>
  )
}

export default App;
