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
import React, { useState } from 'react';
// import { PoweroffOutlined } from '@ant-design/icons';
import { Button as AntdButton, Input as AntdInput, Tooltip } from 'antd'

// reactstrap components
import {
  // Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  //Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import DemoHeader from "components/Headers/DemoHeader.js";
import ComplaintAnalysis from "./ComplaintAnalysis.js";

const { TextArea } = AntdInput;
const Complaint = () => {

  //button -- style
  const [hovered, setHovered] = useState(false);
  const handleHover = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const AntdButtonStyleLeft = {
    boxShadow:"0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
    fontWeight:600,
    marginLeft:7,
    marginRight:7
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
      // const response = await fetch('https://pwc-smt-complaint-flask.azurewebsites.net/api/v1/analyze_complaint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // })

      const response = await fetch('https://dedicatedinsuranceai.azurewebsites.net/api/DocumentSegmentating_v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "question": "If I joined within the last year as an Financial Consultant (FC), what does my personal persistency rate need to be? "
        })
      })

      const data = await response.json();
      // setFormData({
      //   ...formData,
      //   customerinfo: data.customerinfo,
      //   category: data.category,
      //   summary: data.summary,
      //   suggested_response: data.suggested_response
      // });
  
      // console.log(formData);
  
      // setLoadings((prevLoadings) => {
      //   const newLoadings = [...prevLoadings];
      //   newLoadings[index] = false;
      //   return newLoadings;
      // });

    }catch(error){ 
      console.error(error)
    };
  };
  //button -- style

  const [formData, setFormData] = useState({
    content: '',
    customerinfo: '',
    category: '',
    summary: '',
    suggested_response: '',
  });

  const handleChange = (e) => {
    // console.log('START handleChange');
    const { value } = e.target;
    setFormData({ ...formData, content: value });
    // console.log('END handleChange');
  };

  const example1="我在你們的銅鑼灣的門店裡，被一名姓汪的銷售員說服加入了5G手機計劃，但是後來我發現我的手機只支援4G，並無法使用5G網絡。 我認為這名銷售員故意誤導我，使我在不知情的情況下簽署了錯誤的合約。 我希望你們可以取消這個合約，並退還我已經支付的費用。 我也希望你們能夠採取行動，防止這種銷售虛假宣傳的情況再次發生。請儘快處理這個問題。"
  const example2="My name is Amy Wong and phone number is 65579971. I recently bought a Blackberry phone from Smartone Kwun Tong branch two weeks ago. The phone suddenly cannot be powered on yesterday, I called the customer service hotline but the agent is not helpful at all. I am disappointed with the customer service and please provide me instruction to get my phone fixed."

  const setExample = (value) => {
    // console.log('START handleChange');
    if(value==="1"){
      setFormData({ ...formData, content: example1 })
    }
    else if(value==="2"){
      setFormData({ ...formData, content: example2 })
    }
    // console.log('END handleChange');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    // Send the data to the Flask API
    fetch('https://pwc-smt-complaint-flask.azurewebsites.net/api/v1/analyze_complaint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      setFormData({
        ...formData,
        customerinfo: data.customerinfo,
        category: data.category,
        summary: data.summary,
        suggested_response: data.suggested_response
      });
      console.log(formData);
    })
    .catch(error => console.error(error));
  };


  return (
    <>
      <DemoHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="10">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Complaint Case</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="heading-small text-muted mb-4">
                  Complaint Content
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-content"
                          >
                            Please enter your complaint here.
                          </label>
                          {formData["content"]==="" ? 
                          <div style={{display:"flex",alignItems:"baseline", height:40}}>
                            <label
                              className="form-control-label"
                              htmlFor="input-content"
                            >
                              You can try
                            </label>
                            <Tooltip placement="top" title={example1}>
                              <AntdButton
                                type="dashed"
                                onClick={() => setExample("1")}
                                style={AntdButtonStyleLeft}
                                shape="round"
                              >
                              Example 1
                              </AntdButton>
                            </Tooltip>
                            <label
                              className="form-control-label"
                              htmlFor="input-content"
                            >
                              or
                            </label>
                            <Tooltip placement="top" title={example2}>
                              <AntdButton
                                type="dashed"
                                shape="round"
                                onClick={() => setExample("2")}
                                style={AntdButtonStyleLeft}
                              >
                                Example 2
                              </AntdButton>
                            </Tooltip>
                          </div>
                          : 
                          <div style={{display:"flex",alignItems:"baseline", height:40}}></div>
                          }
                          { /*
                          <Input
                            className="form-control-alternative"
                            id="input-content"
                            // placeholder="Username"
                            type="textarea"
                            // value={formData.content}
                            name="content"
                            onChange={handleChange}
                          />
                          */}
                          <TextArea 
                            placeholder="" 
                            allowClear 
                            onChange={handleChange} 
                            value={formData["content"]}
                            rows={10}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Complaint;
