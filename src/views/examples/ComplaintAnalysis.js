// import Typewriter from "typewriter-effect";

// reactstrap components
import {
  Row,
  Col,
  Badge,
  // Input,
  // Spinner,
} from "reactstrap";
import parse from 'html-react-parser';
import React, { useState, useEffect } from 'react';
// import { none } from "effect/index/Logger";

const ComplaintAnalysis = (props) => {
    const [html, setHtml] = useState("")
    useEffect(() => {
      setHtml(props.suggested_response)
    }, [props.suggested_response]);

    return (
        <div>
          <h6 className="heading-small text-muted mb-4">
              Complaint Analysis (Powered by Azure OpenAI)
          </h6>
          <div className="pl-lg-4">
            <Row>
              <Col md="6">
                <div>
                  <label
                    className="form-control-label"
                    htmlFor="input-address"
                  >
                  User Verification
                  </label>
                  &nbsp;&nbsp;
                {props.customerinfo && props.customerinfo !== "NA" &&
                  <span class="badge badge-pill badge-success">Valid User</span>
                }
                {props.customerinfo && props.customerinfo === "NA" &&
                  <span class="badge badge-pill badge-danger">Incomplete/invalid user information</span>
                }
                </div>
                {props.customerinfo && props.customerinfo !== "NA" &&
                  <div style={{whiteSpace: 'pre-line'}}>
                    <p> {props.customerinfo}</p>
                  </div>
                }
                {!props.customerinfo &&
                  // <div></div>
                  <div>
                    <br />
                    <br />
                  </div>
                }
                {props.customerinfo === "NA" &&
                  // <div></div>
                  <div>
                    <br />
                    <br />
                  </div>
                }
                <label
                  className="form-control-label"
                  htmlFor="input-address"
                >
                  Complaint Category
                </label>
                {props.summary &&
                  <div>
                    <h3>
                      <Badge color="primary"> {props.category} </Badge>
                    </h3>
                    <br />
                  </div>
                }
                {!props.summary &&
                  // <div></div>
                  <div>
                    <br />
                    <br />
                  </div>
                }
                <label
                  className="form-control-label"
                  htmlFor="input-city"
                >
                  Complaint Summary
                </label>
                <p> {props.summary} </p>
              </Col>
              <Col md="6">
                <label
                  className="form-control-label"
                  htmlFor="input-address"
                >
                  Suggested Agent Response
                </label>
                {/*<p> {props.suggested_response} </p>*/}
                <p>{parse(html)}</p>
                {/* <Input
                  className="form-control-alternative"
                  id="input-content"
                  placeholder="Username"
                  value={props.suggested_response}
                  type="textarea"
                /> */}
              </Col>
            </Row>
          </div>
        </div>
    )
};

export default ComplaintAnalysis;
