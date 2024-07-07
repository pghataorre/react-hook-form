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

export default SocialMediaFields