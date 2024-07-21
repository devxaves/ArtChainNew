import PaymentModal from "./PaymentModal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import dummyPic from "../assets/pg1.jpg";

function ProjectComponent(props) {
  const [modalShow, setModalShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    amountRaised: 0,
    cid: "",
    creatorName: "",
    fundingGoal: 0,
    projectDescription: "",
    projectName: "",
    contributors: [],
    creationTime: 0,
    duration: 0,
    projectLink: "",
    amount: [],
    creatorAddress: "",
    category: "",
  });
  const [timerString, setTimerString] = useState("");
  const [isOver, setIsOver] = useState(false);
  const location = useLocation();
  const { index } = location.state;
  const PRECISION = 10 ** 18;

  // // func to update the progress bar everytime getProjectDetails() executes.
  // function updateProgressBar() {
  //   let progressBar = document.getElementsByClassName("progressBar")[0];
  //   progressBar.max = projectDetails.fundingGoal / PRECISION;
  //   progressBar.value = projectDetails.amountRaised / PRECISION;
  // }

  // fetch the project details from the smart contract
  async function getProjectDetails() {
    try {
      // fetching project information from the contract
      let res = await props.contract.getProject(parseInt(index)).then((res) => {
        let {
          amountRaised,
          cid,
          creatorName,
          fundingGoal,
          projectDescription,
          projectName,
          contributors,
          creationTime,
          duration,
          projectLink,
          amount,
          creatorAddress,
          refundPolicy,
          category,
          refundClaimed,
          claimedAmount,
        } = { ...res };

        let tmp = [];
        for (const index in contributors) {
          tmp.push({
            contributor: contributors[index],
            amount: amount[index],
            refundClaimed: refundClaimed[index],
          });
        }

        tmp.sort((a, b) => {
          return b.amount - a.amount;
        });

        let contributorsCopy = [];
        let amountCopy = [];
        let refundClaimedCopy = [];
        for (const index in tmp) {
          contributorsCopy.push(tmp[index].contributor);
          amountCopy.push(tmp[index].amount);
          refundClaimedCopy.push(tmp[index].refundClaimed);
        }

        setProjectDetails({
          amountRaised: amountRaised,
          cid: cid,
          creatorName: creatorName,
          fundingGoal: fundingGoal,
          projectDescription: projectDescription,
          projectName: projectName,
          contributors: contributorsCopy,
          creationTime: creationTime * 1,
          duration: duration,
          projectLink: projectLink,
          amount: amountCopy,
          creatorAddress: creatorAddress,
          refundPolicy: refundPolicy,
          category: category,
          refundClaimed: refundClaimedCopy,
          claimedAmount: claimedAmount,
        });
      });
    } catch (error) {
      alert("Error fetching details");
      console.log(error);
    }
  }

  useEffect(() => {
    getProjectDetails();
  }, []);

  useEffect(() => {
    getProjectDetails();
  }, [modalShow]);

  // useEffect hook to handle the countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime() / 1000;
      const remainingTime =
        Number(projectDetails.creationTime) +
        Number(projectDetails.duration) -
        currentTime;
      const days = Math.floor(remainingTime / (60 * 60 * 24));
      const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
      const seconds = Math.floor(remainingTime % 60);

      setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (remainingTime < 0) {
        setTimerString("0d 0h 0m 0s");
        clearInterval(interval);
        // this condition is set because at initial render, creationTime and duration state are not set
        // so remaining time turns out to be negative
        if (projectDetails.creationTime > 0) {
          setIsOver(true);
        }
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [projectDetails.creationTime, projectDetails.duration]);

  // useEffect(() => {
  //   updateProgressBar();
  // }, [projectDetails]);

  // sets the condition true for payment modal to render
  function onClickPayment() {
    setModalShow(true);
  }

  // return category code
  function getCategoryFromCode(val) {
    let categoryCode = ["Design & Tech", "Film", "Arts", "Games"];
    if (val >= 0 && val < 4) return categoryCode[val];
  }

  // convert epoch time format to dd/mm/yyyy format
  function displayDate(val) {
    let date = new Date(val * 1000);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  // check if user is the project owner
  function isOwner() {
    return props.userAddress === projectDetails.creatorAddress;
  }

  // check if claiming fund is possible for the project owner
  function claimFundCheck() {
    return projectDetails.refundPolicy
      ? projectDetails.amountRaised / PRECISION
      : projectDetails.amountRaised >= projectDetails.fundingGoal;
  }

  // claim fund by calling function in the smart contract
  async function claimFund() {
    let txn;
    try {
      txn = await props.contract.claimFund(parseInt(index));
      await txn.wait(txn);
      alert("Fund succesfully claimed");

      setProjectDetails({
        amountRaised: projectDetails.amountRaised,
        cid: projectDetails.cid,
        creatorName: projectDetails.creatorName,
        fundingGoal: projectDetails.fundingGoal,
        projectDescription: projectDetails.projectDescription,
        projectName: projectDetails.projectName,
        contributors: projectDetails.contributors,
        creationTime: projectDetails.creationTime * 1,
        duration: projectDetails.duration,
        projectLink: projectDetails.projectLink,
        amount: projectDetails.amount,
        creatorAddress: projectDetails.creatorAddress,
        refundPolicy: projectDetails.refundPolicy,
        category: projectDetails.category,
        refundClaimed: projectDetails.refundClaimed,
        claimedAmount: true,
      });
    } catch (error) {
      alert("Error claiming fund: " + error);
      console.log(error);
    }
  }

  // check if the user is a contributor to the project
  function checkIfContributor() {
    let idx = getContributorIndex();
    return idx < 0 ? false : true;
  }

  // get the contributor index of the user in the contributor[]
  function getContributorIndex() {
    let idx = projectDetails.contributors.indexOf(props.userAddress);
    return idx;
  }

  // check if claiming refund is possible for the user
  function claimRefundCheck() {
    return projectDetails.refundPolicy
      ? false
      : projectDetails.amountRaised < projectDetails.fundingGoal;
  }

  // claim refund by calling the function in the smart contract
  async function claimRefund() {
    let txn;
    try {
      txn = await props.contract.claimRefund(parseInt(index));
      await txn.wait(txn);
      alert("Refund claimed succesfully");
      let refundClaimedCopy = [...projectDetails.refundClaimed];
      refundClaimedCopy[getContributorIndex()] = true;

      setProjectDetails({
        amountRaised: projectDetails.amountRaised,
        cid: projectDetails.cid,
        creatorName: projectDetails.creatorName,
        fundingGoal: projectDetails.fundingGoal,
        projectDescription: projectDetails.projectDescription,
        projectName: projectDetails.projectName,
        contributors: projectDetails.contributors,
        creationTime: projectDetails.creationTime * 1,
        duration: projectDetails.duration,
        projectLink: projectDetails.projectLink,
        amount: projectDetails.amount,
        creatorAddress: projectDetails.creatorAddress,
        refundPolicy: projectDetails.refundPolicy,
        category: projectDetails.category,
        refundClaimed: refundClaimedCopy,
        claimedAmount: true,
      });
    } catch (error) {
      alert("Error claiming refund: " + error);
      console.log(error);
    }
  }

  return (
    <>
      <div className="projectContainer flex justify-between bg-black/75 px-16 py-10 rounded-2xl">
        {/* <div className="projectHeading text-center text-4xl">
          <h1>{projectDetails.projectName}</h1>
        </div> */}
        <div className="w-1/3">
        <div className="projectImage mx-4 my-5 mb-7">
            <img
              src={
                projectDetails.projectLink
              }
              alt="test-pic"
              className="rounded-lg"
            />
          </div>
          <h1 className="flex flex-col text-left m-2 text-5xl text-orange-600 w-full my-2 mt-3"><span className="text-xl text-neutral-500 mb-1"> Artist Name</span>{projectDetails.projectName}</h1>
        
        <h2 className="flex flex-col text-left m-2 text-3xl text-white w-full mt-4 my-2"><span className="text-xl text-neutral-500 mb-1"> Artist Description</span>{projectDetails.projectName}</h2>
        </div>
        <div className="w-2/3">  
<div className="fundingDetails w-full ">
<div className="projectInformationContainer w-full flex flex-wrap justify-evenly">
<h3 className="flex flex-col text-left m-2 text-2xl text-white w-full my-2 mt-4 overflow-hidden"><span className="text-xl text-neutral-500 mb-1">Funds</span></h3>
           
<div className="remainingDaysContainer text-3xl w-full mx-2 mb-8">
              <h2>{!isOver ? timerString : "Funding duration over!!"}</h2>
            </div>            {/* <div className="progressBarContainer">
              <progress
                min="0"
                max="100"
                value="30"
                className="progressBar"
              ></progress>
            </div> */}
            <div className="w-full sm:w-1/2 lg:w-2/5 px-5 py-4 rounded-xl bg-secondary-black bg-glow-custom-1">
            <div className="flex flex-col h-full justify-center items-center">
              <div>
                <h5 className="flex flex-col mt-1 text-center m-2 text-3xl text-neutral-500 "><span className="text-5xl bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">{projectDetails.amountRaised / PRECISION}</span>LineaETH</h5>
                <p className="text-md p-2 text-xl text-white text-center">
                pledged out of
                </p>                
                  <h5 className="flex flex-col mt-1 text-center m-2 text-xl text-neutral-500"><span className="text-xl text-orange-500">{projectDetails.fundingGoal / PRECISION}</span>LineaETH</h5>
              </div>
            </div>
          </div>


          <div  className="w-full sm:w-1/2 lg:w-2/5 bg-zinc-950 px-5 py-4 rounded-lg bg-secondary-black bg-glow-custom-1">
            <div className="flex flex-col h-full justify-center items-center">
              <div>
                <h5 className="flex flex-col mt-1 text-center m-2 text-3xl text-neutral-500"><span className="text-5xl text-orange-500 bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">{projectDetails.contributors.length}</span>Backers</h5>               
              </div>
            </div>
          </div>
            {/* <div className="fundingValue">
              <h2><span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">{projectDetails.amountRaised / PRECISION}</span> LineaETH</h2>
            </div>
            <p className="goalValueContainer">
              pledged out of goal{" "}
              <span className="goalValue text-xl text-orange-200">
                {projectDetails.fundingGoal / PRECISION} LineaETH
              </span>{" "}
              
            </p> */}
            {/* <div className="supporterContainer">
              <h2>{projectDetails.contributors.length}</h2>
            </div> 
            <p className="afterSupporterContainer">backers</p>*/}
           
            <div className="contributors w-full mt-4 my-2">
          
          {projectDetails.contributors.length > 0 ? (
            <>
            <div className="tableRow header">
            <div className="item border" style={{ width: "80px" }}>
              Sno.
            </div>
            <div className="item border">Address</div>
            <div className="item border">Amount</div>
          </div>
            {projectDetails.contributors.map((contributor, idx) => (
              <div
                className={
                  "tableRow " + (idx % 2 === 0 ? "darkRow" : "lightRow")
                }
                key={idx}
              >
                <div className="item border" style={{ width: "80px" }}>
                  {idx + 1 + "."}
                </div>
                <div className="item border">{contributor}</div>
                <div className="item border">
                  {projectDetails.amount[idx] / PRECISION}
                </div>
              </div>
            ))}
            </>
          ) : (
            <h3 className="flex flex-col text-left m-2 text-2xl text-white w-full mb-5 mt-7 overflow-hidden"><span className="text-xl text-neutral-500 mb-1"> Contributors</span>No Contributions yet</h3>

          )}
        </div>
</div>
        </div>
        <div>
        {!isOver ? (
              !isOwner() && (
                <div className="supportButtonContainer">
                  <button
                    className="supportButton"
                    onClick={() => onClickPayment()}
                  >
                    Back this project
                  </button>
                </div>
              )
            ) : isOwner() ? (
              claimFundCheck() && !projectDetails.claimedAmount ? (
                <div className="supportButtonContainer">
                  <button className="supportButton" onClick={() => claimFund()}>
                    Claim Fund
                  </button>
                </div>
              ) : projectDetails.claimedAmount ? (
                <h2 style={{ color: "red" }}>Fund claimed!</h2>
              ) : (
                ""
              )
            ) : checkIfContributor() &&
              claimRefundCheck() &&
              !projectDetails.refundClaimed[getContributorIndex()] ? (
              <div className="supportButtonContainer">
                <button className="supportButton" onClick={() => claimRefund()}>
                  Claim Refund
                </button>
              </div>
            ) : projectDetails.refundClaimed[getContributorIndex()] ? (
              <h2 style={{ color: "red" }}>Refund Claimed!</h2>
            ) : (
              ""
            )}
            {modalShow && (
              <PaymentModal
                setModalShow={setModalShow}
                contract={props.contract}
                index={index}
                projectDetails={projectDetails}
                setProjectDetails={setProjectDetails}
                userAddress={props.userAddress}
              />
            )}
        </div>
        {/* <div className="projectTopContainer">
          <div className="projectImage">
            <img
              src={
                projectDetails.projectLink
              }
              alt="test-pic"
            />
          </div>
         
            {!isOver && (
              <p className="afterRemainingDaysContainer">
                time left for funding
              </p>
            )}
            
          </div> */}
        </div>
        {/* <div className="projectBottomContainer">
          <div className="aboutContainer">
            <h1 className="about">About</h1>
            <p className="description">{projectDetails.projectDescription}</p>
          </div>
          <div className="projectLinkContainerWrapper">
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Refund Policy:{" "}
                {projectDetails.refundPolicy ? "Non-Refundable " : "Refundable"}
              </p>
            </div>
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Project link:
                <a
                  className="projectLink"
                  target="_blank"
                  href={projectDetails.projectLink}
                >
                  {projectDetails.projectLink}
                </a>
              </p>
            </div>
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Owner:
                <Link
                  className="projectLinkLabel"
                  to="/profile"
                  state={{
                    address: projectDetails.creatorAddress,
                    name: projectDetails.creatorName,
                  }}
                >
                  {" " + projectDetails.creatorName}
                </Link>
              </p>
            </div>
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Category: {getCategoryFromCode(projectDetails.category)}
              </p>
            </div>
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Creation date: {displayDate(projectDetails.creationTime)}
              </p>
            </div>
          </div>
        </div> */}
        
        
      </div>
    </>
  );
}

export default ProjectComponent;
