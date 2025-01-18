import React from "react";
import styled, { keyframes } from "styled-components";
import emailjs from "@emailjs/browser";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 6rem 1rem;
  background: linear-gradient(135deg, #282c34 0%, #1a1d24 100%);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    justify-content: center;
  }
`;

const Content = styled.div`
  max-width: 600px;
  width: 100%;
  animation: ${fadeIn} 1s ease-out;
  padding: 2rem;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 4vw, 3rem);
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #61dafb, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(97, 218, 251, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }

  &:focus {
    outline: none;
    border-color: #61dafb;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(97, 218, 251, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.95rem;
    min-height: 120px;
  }

  &:focus {
    outline: none;
    border-color: #61dafb;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  color: #61dafb;
  border: 2px solid #61dafb;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }

  &:hover {
    background: rgba(97, 218, 251, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(97, 218, 251, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MessageText = styled.p`
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
`;

const SuccessMessage = styled(MessageText)`
  background-color: rgba(0, 255, 0, 0.1);
  color: #4caf50;
`;

const ErrorMessage = styled(MessageText)`
  background-color: rgba(255, 0, 0, 0.1);
  color: #f44336;
`;

const Contact = () => {
  const [status, setStatus] = React.useState('');
  const [formData, setFormData] = React.useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: ''
  });
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (formData.user_name.trim().length < 2) {
      newErrors.user_name = 'Name must be at least 2 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.user_phone)) {
      newErrors.user_phone = 'Please enter a valid phone number';
    }

    // Message validation
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add current year to form data for tracking
    const currentYear = new Date().getFullYear();
    e.target.year = currentYear;

    if (!validateForm()) {
      return;
    }

    setStatus('sending');

    try {
      await emailjs.sendForm(
        'service_onv5ens',
        'template_ubsefdf',
        e.target,
        'HvAny0vZH4eGmJLz8'
      );

      setStatus('success');
      setFormData({ user_name: '', user_email: '', user_phone: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <ContactSection>
      <Content>
        <Title>Get in Touch</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              name="user_name"
              type="text"
              placeholder="Your Name"
              value={formData.user_name}
              onChange={handleChange}
            />
            {errors.user_name && <ErrorMessage>{errors.user_name}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Input
              name="user_email"
              type="email"
              placeholder="Your Email"
              value={formData.user_email}
              onChange={handleChange}
            />
            {errors.user_email && <ErrorMessage>{errors.user_email}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Input
              name="user_phone"
              type="tel"
              placeholder="Your Mobile Number"
              value={formData.user_phone}
              onChange={handleChange}
            />
            {errors.user_phone && <ErrorMessage>{errors.user_phone}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <TextArea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </InputGroup>
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </Button>
          {status === 'success' && (
            <SuccessMessage>Message sent successfully!</SuccessMessage>
          )}
          {status === 'error' && (
            <ErrorMessage>Failed to send message. Please try again.</ErrorMessage>
          )}
        </Form>
      </Content>
    </ContactSection>
  );
};

export default Contact;
