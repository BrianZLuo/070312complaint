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
import React, { useState, useRef} from 'react';
// antd components
import { Button as AntdButton, Input as AntdInput, Avatar, List, Select, Divider, Modal, Steps, Collapse, theme } from 'antd'
import { ExclamationCircleTwoTone, RightCircleTwoTone, CaretRightOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import './ComplaintList.css'
// reactstrap components
import {
  Container,
  Col,
} from "reactstrap";
// core components
import DemoHeader from "components/Headers/DemoHeader.js";
import Modal2 from "views/examples/ModalGenAIComplaint.js";
import { CosmosClient } from '@azure/cosmos';

// ** cosmos db
const endpoint = "https://complaintsemaildb.documents.azure.com:443/"
const key = "uuMJVtfYtNDyaNV7c8CnWCtEc1Q6ikFX8rxR4nrzxalkjOrztrX4VblV3Zkbt0gfuDeWH9UITFs4ACDbN8FHdA=="
const client = new CosmosClient({ endpoint,key })
const databaseID = "SampleDB"
const containerID= "SampleContainer"
// cosmos db **

// antd const
const { Option } = Select;
const { TextArea } = AntdInput;

const Complaint = () => {

  const childRef = useRef()
  
   function getDocuments(){
    const container = client.database(databaseID).container(containerID)
    const querySpec = {query:"SELECT * from c"}
    const {resources}= container.items.query(querySpec).fetchAll()
    console.log(resources)
  }

  // ** left menu filter
  const [rules, updaterules] = useState({
    "priority":"",
    "status":""
  })
  const onStatusChange = (value) => {
    updaterules({...rules, status:value})
  };
  const onPriorityChange = (value) => {
    updaterules({...rules, priority:value})
    console.log(rules)
  }
  const resetBD = () =>{
    updateComplaintArray(dbbackup)
  }
  const appliedDB = () =>{
    var filteredDB = [...dbbackup]
    if(rules['status']){
      console.log("rules['status']",rules['status'])
      filteredDB = filteredDB.filter((item)=>(item.statusCode===rules['status']))
    }
    if(rules['priority']){
      filteredDB = filteredDB.filter((item)=>(item.priority===rules['priority']))
    }
    updateComplaintArray(filteredDB)
  }
  //  left menu filter **


  // ** main complaint list - later retrieve from azure cosmodb restful
  const dbbackup =[
    {
      href: 'https://ant.design',
      title: `Jane Doe`,
      Email:"jane.doe@example.com",
      Phone:"+1(555)555-555",
      AccountNumber:"0987654321",
      AccountType:"Basic",
      BillingAddress:"456 Oak St.",
      City:"Anytown",
      State:"NY",
      ZipCode:"54321",
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`,
      description:
        'The item I received was different from what was advertised.',
      content:
        'I ordered a dress online that was advertised as being made from a certain fabric and having a certain design, but when it arrived, the fabric was different and the design was not as pictured.',
      status:[
        {
          title: 'New',
          description: 'The complaint has been received and is awaiting review. This status indicates that the complaint has been logged in the system, but action has been taken yet. The complaints is waiting to be assigned to a staff member for investigation',
        },

        {
          title: 'In progress',
          description: '',
        },
        {
          title: 'Resolved',
          description: '',
        }
      ],
      startDate:"2023-01-02",
      updateDate:"2023-06-23",
      statusCode:"1",
      priority:"1"
    }
    ,
    {
      href: 'https://ant.design',
      title: `Sarah Lee`,
      Email:"sarah.lee@example.com",
      Phone:"+1(555)234-5678",
      AccountNumber:"2468013579",
      AccountType:"Basic",
      BillingAddress:"321 Pine St.",
      City:"Anytown",
      State:"NY",
      ZipCode:"76543",
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=2`,
      description:
        'I ordered a product online and it arrived damaged.',
      content:
        'I recently ordered a brand new laptop online, but when it arrived, the box was visibly damaged. Upon opening it, I found that the laptop screen was cracked and the keyboard was not functioning properly.',
      status:[
        {
          title: 'New',
          description: 'The complaint has been received and is awaiting review. This status indicates that the complaint has been logged in the system, but action has been taken yet. The complaints is waiting to be assigned to a staff member for investigation',
        },

        {
          title: 'In progress',
          description: "Action is being taken to resolve the complaint. This status indicates that the staff member has indentified a course of action to resolve the complaint and is working to implement it.",
        },
        {
          title: 'Resolved',
          description: '',
        }
      ],
      startDate:"2023-04-02",
      updateDate:"2023-06-24",
      statusCode:"2",
      priority:"2"
    },
    {
      href: 'https://ant.design',
      title: `Liam`,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=3`,
      description:
        'I was charged twice for the same purchase.',
      content:
        'I made a purchase at a retail store using my credit card, but when I checked my bank statement, I realized that I had been charged twice for the same amount.',
      startDate:"2023-01-02",
      updateDate:"2023-07-02",
      statusCode:"3",
      status:[
        {
          title: 'New',
          description: 'The complaint has been received and is awaiting review. This status indicates that the complaint has been logged in the system, but action has been taken yet. The complaints is waiting to be assigned to a staff member for investigation',
        },

        {
          title: 'In progress',
          description: "Action is being taken to resolve the complaint. This status indicates that the staff member has indentified a course of action to resolve the complaint and is working to implement it.",
        },
        {
          title: 'Resolved',
          description: 'The complaint has been resolved to statisfaction of the complaintant. This status indicatest that the complaint has been fully investigated and resolved, and the complaintant is satisfied with the outcome.',
        }],
        priority:"3"
    },
    {
      href: 'https://ant.design',
      title: `Sophia`,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=4`,
      description:
        'The customer service representative was rude and unhelpful.',
      content:
        'I called a customer service line to inquire about a product, but the representative I spoke to was dismissive and uninterested in helping me',
      status:[
        {
          title: 'New',
          description: 'The complaint has been received and is awaiting review. This status indicates that the complaint has been logged in the system, but action has been taken yet. The complaints is waiting to be assigned to a staff member for investigation',
        },

        {
          title: 'In progress',
          description: '',
        },
        {
          title: 'Resolved',
          description: '',
        }
      ],
      startDate:"2023-01-02",
      updateDate:"2023-06-23",
      statusCode:"1",
      priority:"3"
    },
    {
      href: 'https://ant.design',
      title: `Jackson`,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=5`,
      description:
        'The product I received was expired.',
      content:
        'I called a customer service line to inquire about a product, but the representative I spoke to was dismissive and uninterested in helping me',
      status:[
        {
          title: 'New',
          description: 'The complaint has been received and is awaiting review. This status indicates that the complaint has been logged in the system, but action has been taken yet. The complaints is waiting to be assigned to a staff member for investigation',
        },

        {
          title: 'In progress',
          description: '',
        },
        {
          title: 'Resolved',
          description: '',
        }
      ],
      startDate:"2023-01-02",
      updateDate:"2023-06-23",
      statusCode:"1",
      priority:"3"
    },
    {
      href: 'https://ant.design',
      title: `Jackson`,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=6`,
      description:
        'I never received my order even though it was marked as delivered.',
      content:
        'I ordered a package that was marked as delivered, but it never arrived at my doorstep, and the delivery company was unable to provide any information about its whereabouts',
      status:[
        {
          title: 'New',
          description: 'The complaint has been received and is awaiting review. This status indicates that the complaint has been logged in the system, but action has been taken yet. The complaints is waiting to be assigned to a staff member for investigation',
        },

        {
          title: 'In progress',
          description: '',
        },
        {
          title: 'Resolved',
          description: '',
        }
      ],
      startDate:"2023-01-02",
      updateDate:"2023-06-23",
      statusCode:"1",
      priority:"3"
    },
    {
      href: 'https://ant.design',
      title: `Isebella`,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=7`,
      description:
        'The item was supposed to be delivered in 2 days, but it took 2 weeks.',
      content:
        'I ordered a product with express shipping, but it took much longer than the promised delivery date, causing me to miss an important event.',
      status:[
        {
          title: 'New',
          description: 'The complaint has been received and is awaiting review. This status indicates that the complaint has been logged in the system, but action has been taken yet. The complaints is waiting to be assigned to a staff member for investigation',
        },

        {
          title: 'In progress',
          description: '',
        },
        {
          title: 'Resolved',
          description: '',
        }
      ],
      startDate:"2023-01-02",
      updateDate:"2023-06-23",
      statusCode:"1",
      priority:"3"
    },
    {
      href: 'https://ant.design',
      title: `Aiden`,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=8`,
      description:
        'The website crashed while I was trying to make a purchase.',
      content:
        'I was trying to buy concert tickets online, but the website crashed multiple times during the checkout process, causing me to miss out on the tickets.',
      status:[
        {
          title: 'New',
          description: 'The complaint has been received and is awaiting review. This status indicates that the complaint has been logged in the system, but action has been taken yet. The complaints is waiting to be assigned to a staff member for investigation',
        },

        {
          title: 'In progress',
          description: '',
        },
        {
          title: 'Resolved',
          description: '',
        }
      ],
      startDate:"2023-01-02",
      updateDate:"2023-06-23",
      statusCode:"1",
      priority:"3"
    }
  ]
  const [gptcomplaintsample, updateComplaintArray] = useState(dbbackup);
  const selectitem = (item) =>{
    setItemLatest(item)  // update select value
    if(childRef.current){
      childRef.current.updateSelectedContent(item)
    }
  }
  const [itemLatest, setItemLatest] = useState([]);
  // main complaint list - later retrieve from azure cosmodb restful **



  // ** right detail bar
  // ** collapse css
  const getItems = (panelStyle) => [
    {
      key: '1',
      label: 'Process Status',
      children: 
        <Steps
        progressDot
        current={itemLatest['statusCode']}
        direction="vertical"
        items={itemLatest['status']}
      />
      ,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'User Profile',
      children: 
      <div>
        <label
          className="form-control-label"
          htmlFor="input-content"
        >
          Name:{itemLatest['title']}
          <br/>Email:{itemLatest['Email']}
          <br/>Phone:{itemLatest['Phone']}
          <br/>Account Number:{itemLatest['Account Number']}
          <br/>Account Type:{itemLatest['Account Type']}
          <br/>Billing Address:{itemLatest['Billing Address']}
          <br/>Street:{itemLatest['Street']}
          <br/>City:{itemLatest['City']}
          <br/>ZipCode:{itemLatest['ZipCode']}
        </label>
      </div>,
      style: panelStyle,
    }
  ];
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  // collapse css **
  // right detail bar **

  

  // ** modal 1. manual defalut form value
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const newArray = [formvalue, ...gptcomplaintsample]
    updateComplaintArray(newArray)
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [formvalue, updateFormvalue] = useState({
    href: 'https://ant.design',
    title: `Savannah Yuan`,
    Email:"savannah.yuan@example.com",
    Phone:"+1(333)333-3333",
    AccountNumber:"7777777777",
    AccountType:"Basic",
    BillingAddress:"456 Milk St.",
    City:"Anytown",
    State:"NY",
    ZipCode:"12345",
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=9`,
    description:
      'The product I received was missing parts.',
    content:
      'I ordered a toy for my child, but when I opened the box, some of the parts were missing, making it impossible to assemble.',
    status:[
      {
        title: 'New',
        description: 'The complaint has been received and is awaiting review. This status indicates that the complaint has been logged in the system, but action has been taken yet. The complaints is waiting to be assigned to a staff member for investigation',
      },

      {
        title: 'In progress',
        description: '',
      },
      {
        title: 'Resolved',
        description: '',
      }
    ],
    startDate:"2023-07-05",
    updateDate:"2023-07-05",
    statusCode:0
  });
  const updateTitle = (event) =>{
    updateFormvalue({...formvalue, title:event.target.value})
  }
  const updateDescription = (event) =>{
    updateFormvalue({...formvalue, description:event.target.value})
  }
  const updateContent = (event) =>{
    updateFormvalue({...formvalue, content:event.target.value})
  }
  // modal 1. manual defalut form value **

  

  // ** modal 2. selected complaint GenAI
  const [isGenAIModalOpen, setIsGenAIModalOpen] = useState(false);
  const showGenAIModal = () => {
    setIsGenAIModalOpen(true);
    getDocuments();
  };
  const handleGenAIOk = () => {
    setIsGenAIModalOpen(false);
  };
  const handleGenAICancel = () => {
    setIsGenAIModalOpen(false);
  };
  // modal 2. selected complaint GenAI **



  return (
    <>
      {/* Fixed Position Btn */}
      <AntdButton type="primary" style={{position:"fixed",bottom:30,right:30,height:40,width:140,zIndex:100001}} onClick={showModal}>
        New Complaint
      </AntdButton>

      {/* Modal 1 - Manual New Complaint */}
      <Modal title="New Complaint" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>        
        <label className="form-control-label" htmlFor="input-content">
          Please enter your name.
        </label>
        <TextArea 
          placeholder="" 
          allowClear 
          rows={1}
          value={formvalue.title}
          onChange={updateTitle}
        />
        
        <label className="form-control-label" htmlFor="input-content">
          Please enter your complaint description.
        </label>
        <TextArea 
          placeholder="" 
          allowClear 
          rows={3}
          value={formvalue.description}
          onChange={updateDescription}
        />

        <label className="form-control-label" htmlFor="input-content">
          Please enter your complaint content.
        </label>
        <TextArea 
          placeholder="" 
          allowClear 
          rows={3}
          value={formvalue.content}
          onChange={updateContent}
        />
      </Modal>

      {/* Modal 2 - Selected GenAI Page */}
      <Modal title="GenAI Complaint" open={isGenAIModalOpen} onOk={handleGenAIOk} onCancel={handleGenAICancel}>
        <Modal2 ref={childRef} />
      </Modal>
      
      
      {/* Page header */}
      <DemoHeader />

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="12">
          <div style={{display:"flex",width:"100%"}}>

            {/* Left menu */}
            <div style={{width:250, backgroundColor:"#f7f7f7", borderRadius:"10px 0px 0px 10px", display:"flex", flexDirection:"column", padding:20}}>
              
              <label className="form-control-label" htmlFor="input-content">
                Status
              </label>
              <Select
                placeholder="Select Status"
                onChange={onStatusChange}
                allowClear
              >
                <Option value="1">New</Option>
                <Option value="2">In Progress</Option>
                <Option value="3">Resolved</Option>
              </Select>
              <Divider/>

              <label className="form-control-label" htmlFor="input-content">
                Priority
              </label>
              <Select
                placeholder="Select Category"
                onChange={onPriorityChange}
                allowClear
              >
                <Option value="1">Urgent</Option>
                <Option value="2">High</Option>
                <Option value="3">Normal</Option>
              </Select>
              <Divider/>

              <div style={{display:"flex", justifyContent:"space-between"}}>
                <AntdButton
                  onClick={()=>resetBD()}
                >
                  Reset
                </AntdButton>
                <AntdButton
                  type="primary"
                  onClick={()=>appliedDB()}
                >
                  Apply
                </AntdButton>
              </div>

            </div>

            {/* Main complaint list */}
            <div style={{flex:1, backgroundColor:"white", padding:20}}>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={gptcomplaintsample}
                renderItem={(item) => (
                  <List.Item
                    onClick={()=>{selectitem(item)}}
                    key={item.title}
                    actions={[
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        {/* Left - Priority & Start Date */}
                        <div>
                          {item.priority==="1"?
                            <label
                              className="form-control-label"
                              htmlFor="input-content"
                              style={{color:"red"}}
                            >
                              Urgent
                            </label>
                            :(
                            item.priority==="2"?
                            <label
                              className="form-control-label"
                              htmlFor="input-content"
                              style={{color:"yellow"}}
                            >
                              High
                            </label>
                            :
                            <label
                              className="form-control-label"
                              htmlFor="input-content"
                              style={{color:"blue"}}
                            >
                              Normal
                            </label>
                            )
                          }
                          {/* Start Date */}  
                          <label
                            className="form-control-label"
                            htmlFor="input-content"
                            style={{marginLeft:3}}
                          >
                            Start Date:{item.startDate}
                          </label> 
                        </div>
                        {/* Right - Status & Update Date*/}
                        <div>
                          <label
                            className="form-control-label"
                            htmlFor="input-content"
                          >
                            Update Date:{item.updateDate}
                          </label>
                          {item.statusCode==="3"?
                            <CheckCircleTwoTone twoToneColor="#52c41a" style={{marginLeft:5, width:22,height:22}} />
                            :(
                            item.statusCode==="2"?
                            <RightCircleTwoTone twoToneColor="#dfd953" style={{marginLeft:5, width:22,height:22}}/>
                            :
                            <ExclamationCircleTwoTone twoToneColor="#89bfff" style={{marginLeft:5, width:22,height:22}}/>
                            )
                          }
                        </div>
                      </div>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>

            {/* Right details */}
            <div style={{width:400, backgroundColor:"white", borderRadius:"0px 10px 10px 0px",display:"flex", flexDirection:"column", padding:20}}>
              <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{
                  background: token.colorBgContainer,
                }}
                items={getItems(panelStyle)}
              />
              <AntdButton type="primary" onClick={showGenAIModal}>
                GenAI
              </AntdButton>
            </div>

          </div>
        </Col>
      </Container>
    </>
  );
};

export default Complaint;
