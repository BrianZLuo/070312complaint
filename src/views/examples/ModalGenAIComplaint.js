/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useImperativeHandle, forwardRef } from 'react';
// antd components
import { Button as AntdButton, Input as AntdInput } from 'antd'
// reactstrap components
import {
  FormGroup,
  Form,
  Row,
  Col,
} from "reactstrap";
// core components
import ComplaintAnalysis from "./ComplaintAnalysis.js";



const { TextArea } = AntdInput;
const Complaintbody = forwardRef((props,ref) => {

  // ** submit button
  const [hovered, setHovered] = useState(false);
  const handleHover = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const AntdButtonStyleRight = {
    transition: 'transform 0.2s ease-in-out',
    transform: hovered ? 'translate(0, -1px)' : 'none',
    background: "#11cdef",
    borderColor: "#11cdef",
    boxShadow:"0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
    height:"43px",
    width:"93px",
    fontWeight:600,
  };
  const [loadings, setLoadings] = useState([]);
  const enterLoading = async (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    // Send the data to the Flask API
    try{
      const response = await fetch('https://pwc-smt-complaint-flask.azurewebsites.net/api/v1/analyze_complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      setFormData({
        ...formData,
        customerinfo: data.customerinfo,
        category: data.category,
        summary: data.summary,
        suggested_response: data.suggested_response
      });
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }catch(error){ 
      console.error(error)
    };
  };
  // submit button **

  // ** content variable 
  const [formData, setFormData] = useState({
    content: "",
    customerinfo: '',
    category: '',
    summary: '',
    suggested_response: '',
  });
  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, content: value });
  };
  // ** father invoke update func - pass val and init content**
  useImperativeHandle(ref, ()=>({
    updateSelectedContent:(val)=>{
      //setFormData({ ...formData, content: val.content });
      setFormData({
        content: val.content,
        customerinfo: '',
        category: '',
        summary: '',
        suggested_response: '',
      });
    }
  }))
  // content variable **

  return (
    <>
        <Row>
          <Col className="order-xl-1" xl="12">
            
            {/* Header */}
            <h6 className="heading-small text-muted mb-4">
              Complaint Content
            </h6>

            {/* Default Input & submit */}
            <div>
              <Row>
                <Col lg="12">
                  <Form>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-content"
                      >
                        Please customize the complaint here.
                      </label>
                      <TextArea 
                        placeholder="" 
                        allowClear 
                        onChange={handleChange} 
                        value={formData["content"]}
                        rows={5}
                      />
                    </FormGroup>
                    <AntdButton
                      type="primary"
                      loading={loadings[1]}
                      onClick={() => enterLoading(1)}
                      style={AntdButtonStyleRight}
                      onMouseEnter={handleHover}
                      onMouseLeave={handleMouseLeave}
                    >
                      Submit
                    </AntdButton>
                  </Form>
                </Col>
              </Row>
            </div>
            <hr className="my-4" />

            {/* Complaint Analysis */}
            <ComplaintAnalysis customerinfo = { formData.customerinfo } category={ formData.category } summary={ formData.summary } suggested_response={ formData.suggested_response }/>

          </Col>
        </Row>
    </>
  );
});

export default Complaintbody;
