import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input'
import Layout from '../../components/Layout';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { addCategory, getAllCategory } from '../../actions';
import { useDispatch, useSelector } from 'react-redux'


/**
 * 
 * @author
 * @function Category
 */
const Category = (props) => {

    const category = useSelector(state => state.category)
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Category.js')
        dispatch(getAllCategory());
    }, []);

    const handleClose = () => {
        const form = new FormData();
        
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)
        dispatch(addCategory(form))
        /*const cat = {
            categoryName,
            parentCategoryId,
            setCategoryImage
        };*/

        setShow(false);
    }
    const handleShow = () => setShow(true);

   
   
    const renderCategories = (categories) => {
        let mycategories = [];
        for (let category of categories) {
            mycategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return mycategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;


    }
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>                            <h3>Category</h3>
                            <button onClick={handleShow}>Add Products</button>
                        </div>

                    </Col>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                            {/* {JSON.stringify(createCategoryList(category.categories))} */}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <select className="form-control"
                      value={parentCategoryId} 
                    onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>Select Category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage}></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Category;