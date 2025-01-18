import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #282c34;
  color: #a0a0a0;
  padding: 2rem 0;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SocialLinks = styled.div`
  margin: 1rem 0;
  
  a {
    color: #a0a0a0;
    text-decoration: none;
    margin: 0 1rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #fff;
    }
  }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <SocialLinks>
                    <a href="https://github.com/ansarthameem30" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/ansar-thameem-3774641b3/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="mailto:ansarthameem30@gmail.com">Email</a>
                </SocialLinks>
                <p>&copy; {new Date().getFullYear()} Ansar Thameem. All Rights Reserved.</p>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;
