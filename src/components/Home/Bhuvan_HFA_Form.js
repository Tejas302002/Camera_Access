import React, { useState } from 'react';
import './Form.css'; // Assuming you have your CSS file named Form.css
import { WebcamCapture } from '../Webcam/Webcam';

const Form = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="body">
      <div className="container">
        {step === 1 && <PersonalDetails onNext={nextStep} />}
        {step === 2 && <Address onPrevious={previousStep} onNext={nextStep} />}
        {step === 3 && <CapturePhotos onPrevious={previousStep} />}
      </div>
    </div>
  );
};

const PersonalDetails = ({ onNext }) => {
  const [name, setName] = useState('');
  const [Observer_Name, setObserver] = useState('');
  const [mobilenumber, setnumber] = useState('');
  const [Organisation_Name, setOrganisation] = useState('');
  const [State_Name, setState] = useState('');
  const [District_Name, setDistrict] = useState('');
  const [City_Name, setCity] = useState('');
  const [City_Code, setCity_code] = useState('');

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="form first">
      <h2 className="title">Personal Details</h2>
      <div className="fields">
        <div className="input-field">
          <label>Username</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-field">
          <label>Observer Name</label>
          <input type="email" value={Observer_Name} onChange={(e) => setObserver(e.target.value)} />
        </div>
        <div className="input-field">
          <label>Organisation Name</label>
          <input type="text" value={Organisation_Name} onChange={(e) => setOrganisation(e.target.value)} />
        </div>
        <div className="input-field">
          <label>Mobile Number</label>
          <input type="text" value={mobilenumber} onChange={(e) => setnumber(e.target.value)} />
        </div>
        <div className="input-field">
          <label>State Name</label>
          <input type="text" value={State_Name} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="input-field">
          <label>District Name</label>
          <input type="text" value={District_Name} onChange={(e) => setDistrict(e.target.value)} />
        </div>
        <div className="input-field">
          <label>City</label>
          <input type="text" value={City_Name} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="input-field">
          <label>City Code</label>
          <input type="text" value={City_Code} onChange={(e) => setCity_code(e.target.value)} />
        </div>
      </div>
      <div className="buttons">
        <button className="nextBtn" onClick={handleNext}>
          <span className="btnText">Next</span>
        </button>
      </div>
    </div>
  );
};

const Address = ({ onPrevious, onNext }) => {
    const [address, setAddress] = useState('');
    const [beneficiaryId, setBeneficiaryId] = useState('');
    const [annexureId, setAnnexureId] = useState('');
    const [wardName, setWardName] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [beneficiaryFatherName, setBeneficiaryFatherName] = useState('');
    const [constructionType, setConstructionType] = useState('');
    const [houseType, setHouseType] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('');
    const [projCode, setProjCode] = useState('');
    const [financialYear, setFinancialYear] = useState('');
    const [constructionFloorType, setConstructionFloorType] = useState('');
    const [proposedFloor, setProposedFloor] = useState('');
    const [currentFloor, setCurrentFloor] = useState('');
    const [stage, setStage] = useState('');
    const [electricity, setElectricity] = useState('');
    const [water, setWater] = useState('');
    const [sewerage, setSewerage] = useState('');
    const [occupationStatus, setOccupationStatus] = useState('');
  
    const handlePrevious = () => {
      onPrevious();
    };
  
    const handleNext = () => {
      // Validate fields if necessary
      onNext();
    };
  
    return (
      <div className="form second">
        <h2 className="title">Address</h2>
        <div className="fields">
          <div className="input-field">
            <label>Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Beneficiary ID</label>
            <input type="text" value={beneficiaryId} onChange={(e) => setBeneficiaryId(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Annexure ID</label>
            <input type="text" value={annexureId} onChange={(e) => setAnnexureId(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Ward Name</label>
            <input type="text" value={wardName} onChange={(e) => setWardName(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Beneficiary Name</label>
            <input type="text" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Beneficiary Father's Name</label>
            <input type="text" value={beneficiaryFatherName} onChange={(e) => setBeneficiaryFatherName(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Construction Type</label>
            <input type="text" value={constructionType} onChange={(e) => setConstructionType(e.target.value)} />
          </div>
          <div className="input-field">
            <label>House Type</label>
            <input type="text" value={houseType} onChange={(e) => setHouseType(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Project Name</label>
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Project Type</label>
            <input type="text" value={projectType} onChange={(e) => setProjectType(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Project Code</label>
            <input type="text" value={projCode} onChange={(e) => setProjCode(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Financial Year</label>
            <input type="text" value={financialYear} onChange={(e) => setFinancialYear(e.target.value)} />
          </div>
          <div className="input-field">
            <label>Construction Floor Type</label>
            <input type="text" value={constructionFloorType} onChange={(e) => setConstructionFloorType(e.target.value)} />
          </div>
          <div className="input-field">
          <label>Proposed Floor</label>
          <input type="text" value={proposedFloor} onChange={(e) => setProposedFloor(e.target.value)} />
        </div>
        <div className="input-field">
          <label>Current Floor</label>
          <input type="text" value={currentFloor} onChange={(e) => setCurrentFloor(e.target.value)} />
        </div>
        <div className="input-field">
          <label>Stage</label>
          <input type="text" value={stage} onChange={(e) => setStage(e.target.value)} />
        </div>
        <div className="input-field">
          <label>Electricity</label>
          <input type="text" value={electricity} onChange={(e) => setElectricity(e.target.value)} />
        </div>
        <div className="input-field">
          <label>Water</label>
          <input type="text" value={water} onChange={(e) => setWater(e.target.value)} />
        </div>
        <div className="input-field">
          <label>Sewerage</label>
          <input type="text" value={sewerage} onChange={(e) => setSewerage(e.target.value)} />
        </div>
        <div className="input-field">
          <label>Occupation Status</label>
          <input type="text" value={occupationStatus} onChange={(e) => setOccupationStatus(e.target.value)} />
        </div>
      </div>
      <div className="buttons">
        <button className="backBtn" onClick={handlePrevious}>
          <i className="fa fa-arrow-left"></i>
          <span className="btnText">Previous</span>
        </button>
        <button className="nextBtn" onClick={handleNext}>
          <span className="btnText">Next</span>
        </button>
      </div>
    </div>
  );
}
const CapturePhotos = ({ onPrevious }) => {
  const handlePrevious = () => {
    onPrevious();
  };

  return (
    <div className="form second">
      <h2 className="title">Capture Photos</h2>
      <WebcamCapture/>
      {/* Add photo capture functionality */}
      <div className="buttons">
        <button className="backBtn" onClick={handlePrevious}>
          <i className="fa fa-arrow-left"></i>
          <span className="btnText">Previous</span>
        </button>
        <button className="submitBtn">
          <span className="btnText">Submit</span>
        </button>
      </div>
    </div>
  );
};

export default Form;
