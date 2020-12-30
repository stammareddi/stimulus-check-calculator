import { Form, Button, Container, FormControl } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onchangeIncome = this.onchangeIncome.bind(this);
    this.onchangeStatus = this.onchangeStatus.bind(this);
    this.onchangeChildren = this.onchangeChildren.bind(this);
    this.state = {
      income: Number(),
      status: Number(0),
      children: Number()
    };
  }

  onchangeChildren(e) {
    this.setState({ children: e.target.value });
  }
  onchangeStatus(e) {
    this.setState({ status: e.target.value });
  }
  onchangeIncome(e) {
    this.setState({ income: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const entry = {
      income: this.state.income,
      status: this.state.status,
      children: this.state.children
    };

    let incomeval = Number(entry.income);
    console.log(incomeval);
    let statusval = Number(entry.status);

    let childval = Number(entry.children);
    const headcount = [1, 2, 1];
    const limit = [75000, 150000, 112500];

    let estimate = 600 * (headcount[statusval] + childval);

    let amountOverLimit = Math.max(0, incomeval - limit[statusval]);
    let reductionAmount = amountOverLimit * 0.05;
    let finalEstimate = Math.max(0, estimate - reductionAmount);

    if (Number.isNaN(finalEstimate) || incomeval == 0) {
      document.getElementById("stimulusCheck").innerText =
        "Please enter in valid numbers";
    } else {
      document.getElementById("stimulusCheck").innerText =
        "You are likely getting a " + finalEstimate + " stimulus payment";
    }
  }

  render() {
    return (
      <Container className="container-stimulus">
        <Form>
          <Form.Group controlId="formBasicStatus">
            <Form.Label>
              What was your filing status in your 2019 taxes?
            </Form.Label>
            <Form.Check
              name="groupOptions"
              type="radio"
              label="Single"
              onChange={this.onchangeStatus}
              value="0"
              checked={true}
            />
            <Form.Check
              name="groupOptions"
              type="radio"
              label="Married"
              onChange={this.onchangeStatus}
              value="1"
            />
            <Form.Check
              name="groupOptions"
              type="radio"
              label="Head of household"
              onChange={this.onchangeStatus}
              value="2"
            />
          </Form.Group>

          <Form.Group controlId="formBasicIncome">
            <Form.Label>
              What was your adjusted gross income. Can be found on field 8b of
              your last 1040 form (numbers only)
            </Form.Label>
            <Form.Control
              onChange={this.onchangeIncome}
              type="text"
              placeholder="ex: 200000"
              id="rounded"
            />
          </Form.Group>

          <Form.Group controlId="formBasicChildren">
            <Form.Label>
              How many children under age 17 did you claim as dependents in
              2019?
            </Form.Label>
            <Form.Control
              type="text"
              onChange={this.onchangeChildren}
              placeholder="ex: 1"
              id="rounded"
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Submit
          </Button>
          <br />
          <br />
          <label id="stimulusCheck"></label>
        </Form>
      </Container>
    );
  }
}
