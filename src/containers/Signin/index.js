import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import {Container ,Form, Row ,Col,Button} from 'react-bootstrap';
import Input from '../../components/UI/Input';
import {isUserLoggedIn, login} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
//import { isUserLoggedIn } from '../../actions';

/**
 * @author
 * @function  Signin
 */

const Signin =(props) => {


    const[email,setEmaail] = useState('');
    const[password,setPassword] =useState('');
    const[error,setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();


    

    const userLogin = (e) =>{

        e.preventDefault();

        const user = {
            email,password
            
        }

        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={'/'}/>
    }

    return(
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                                    <Input
                                    lable="Email"
                                    placeholder="Emial"
                                    value="email"
                                    type="email"
                                    onChange={(e)=> setEmaail(e.target.value)}
                                    />

                                    <Input
                                    lable="Password"
                                    placeholder="Password"
                                    value="password"
                                    type="password"
                                    onChange={(e)=> setPassword(e.targetvalue)}
                                    />
                            <Button variant="primary" type="submit">
                                Submit
                        </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>

        </Layout>
    )
}

export default Signin;