import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as emailjs from 'emailjs-com';
import { TextField, Button } from '@material-ui/core';
import Swal from 'sweetalert2';
const Contact = () => {
  let errors = {};
  return (
    <div className='page contact'>
      <div className='container'>
        <div className='row'>
          <div className='form'>
            <p>Feel free to reach me!</p>
            <Formik
              initialValues={{ name: '', email: '', message: '' }}
              onSubmit={(data, { setSubmitting, resetForm }) => {
                errors = {};
                setSubmitting(true);
                console.log('submit', data);
                let template_params = {
                  reply_to: data.email,
                  from_name: data.name,
                  message_html: data.message,
                };
                let service_id = 'default_service';
                let template_id = 'template_bI7QUFno';

                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
                ) {
                  errors.email = 'Invalid email address';
                } else if (data.email && data.name && data.message)
                  emailjs
                    .send(
                      service_id,
                      template_id,
                      template_params,
                      'user_yewfZMZkNB2ExHznDWiUn'
                    )
                    .then((res) => {
                      console.log(res);
                      Swal.fire({
                        title: 'Thank you for contacting me!',
                        // text: 'Do you want to continue',
                        icon: 'success',
                        // confirmButtonText: 'Cool'
                      });
                      resetForm();
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                else
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: 'You may miss some fields',
                  });
                setSubmitting(false);
              }}
            >
              {({
                values,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form>
                  <Field
                    required
                    placeholder='Name'
                    name='name'
                    type='input'
                    fullWidth
                    as={TextField}
                  />
                  <div className='field'>
                    <Field
                      required
                      fullWidth
                      placeholder='Email'
                      name='email'
                      type='input'
                      as={TextField}
                    />
                    {errors.email ? <div>{errors.email}</div> : null}
                  </div>
                  <div className='field'>
                    <Field
                      required
                      fullWidth
                      placeholder='Message'
                      name='message'
                      type='input'
                      multiline
                      rows='4'
                      as={TextField}
                    />
                  </div>

                  {/* <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          /> */}
                  <div className='field'>
                    <Button disabled={isSubmitting} type='submit'>
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
