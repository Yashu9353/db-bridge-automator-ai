
import { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  Button,
  InlineNotification,
} from "@carbon/react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import IBMLogo from "../icons/IBMLogo";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both email and password are required");
      return;
    }
    
    const success = login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="cds--grid">
      <div className="cds--row cds--row--condensed">
        <div className="cds--col cds--offset-lg-5 cds--col-lg-6 cds--col-md-8 cds--col-sm-4">
          <div className="cds--tile cds--mt-07">
            <div className="cds--mb-07">
              <div className="cds--text-align--center">
                <IBMLogo className="cds--mb-05" />
                <h1 className="cds--type-productive-heading-04">
                  Database Migration
                </h1>
              </div>
              
              {error && (
                <InlineNotification
                  kind="error"
                  title="Error"
                  subtitle={error}
                  hideCloseButton={false}
                  onClose={() => setError("")}
                  className="cds--mb-05"
                />
              )}

              <Form onSubmit={handleSubmit}>
                <div className="cds--mb-07">
                  <FormGroup legendText="">
                    <TextInput
                      id="email"
                      labelText="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="cds--mb-05"
                    />
                    <TextInput
                      id="password"
                      labelText="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                  
                  <Button type="submit" kind="primary" size="md" className="cds--mt-05" style={{ width: '100%' }}>
                    Log in
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
