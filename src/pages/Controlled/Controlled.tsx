import React, { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Controlled.module.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../../entities';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: yup.number().required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
      'Your password is weak!'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().oneOf(['male', 'female']).required('Gender is required'),
  terms: yup.boolean().isTrue('You must accept the Terms and Conditions'),
  pictureInBase64: yup.string(),
});

const Controlled = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pictureInBase64, setPictureInBase64] = useState<string | null>(null);

  const handlePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPictureInBase64(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<User> = (data) => {
    const userDataWithPicture = { ...data, pictureInBase64: pictureInBase64 };
    dispatch(addUser(userDataWithPicture));
    navigate('/');
    console.log('Form submitted successfully:', data);
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input
          {...register('name')}
          type="text"
          placeholder="e.g. Almas"
          id="name"
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <label htmlFor="age">Age:</label>
        <input
          {...register('age')}
          type="text"
          placeholder="e.g. 18"
          id="age"
        />
        {errors.age && <p className={styles.error}>{errors.age.message}</p>}

        <label htmlFor="email">Email:</label>
        <input
          {...register('email')}
          type="text"
          placeholder="e.g. example@gmail.com"
          id="email"
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          {...register('password')}
          type="text"
          placeholder="e.g. ^AMbWGK,)5"
          id="password"
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <label htmlFor="confirm-password">Confirm Your Password</label>
        <input
          {...register('confirmPassword')}
          type="text"
          placeholder="e.g. ^AMbWGK,)5"
          id="confirm-password"
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}

        <label htmlFor="gender">Select Gender</label>
        <div className={styles.option}>
          <input {...register('gender')} type="radio" value="male" />
          <label htmlFor="male">Male</label>
        </div>
        <div className={styles.option}>
          <input {...register('gender')} type="radio" value="female" />
          <label htmlFor="female">Female</label>
        </div>
        {errors.gender && (
          <p className={styles.error}>{errors.gender.message}</p>
        )}

        <div className={styles.option}>
          <input {...register('terms')} type="checkbox" id="terms" />
          <label htmlFor="terms">Accept for Terms and Conditions</label>
        </div>
        {errors.terms && <p className={styles.error}>{errors.terms.message}</p>}

        <input
          onChange={handlePicture}
          type="file"
          id="picture"
          name="picture"
          accept=".png, .jpeg"
        />
        <input type="submit" value={'Submit Person'} />
      </form>
    </div>
  );
};

export default Controlled;
