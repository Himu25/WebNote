import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Error(){
    return (
        <Wrapper>
            <div className="container min-vh-100">
                <div>
                    <h2>404</h2>
                    <h3>UH OH! You're lost.</h3>
                    <p>
                        The page you are looking for does not exist. How you got here is a
                        mystery. But you can click the button below to go back to the
                        homepage.
                    </p>

                    <NavLink to="/" className="btn text-white" style={{background: '#f5ba13'}}>
                    Go Back to Home
                    </NavLink>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
  .container {
    padding: 1rem 0;
    text-align: center;

    h2 {
      font-size: 10rem;
    }

    h3 {
      font-size: 4.2rem;
    }

    p {
      margin: 2rem 0;
    }
  }
`;

export default Error;