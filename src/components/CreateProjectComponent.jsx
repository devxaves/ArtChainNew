import { useState, useEffect } from "react";
import { ethers } from "ethers";

function CreateProjectComponent({ contract }) {
  Array.from(document.getElementsByClassName("navigation-list-item")).map((item)=>{item.removeAttribute("style","color:#f97316;")})

  document.getElementById("CreateNav").setAttribute("style","color:#f97316;")
  const [provider, setProvider] = useState(null);
  const [formInput, setFormInput] = useState({
    projectName: "",
    description: "",
    creatorName: "creator",
    image: "image",
    link: "",
    goal: "",
    duration: "",
    category: "3",
    refundPolicy: "1",
  });

  useEffect(() => {
    async function setupProvider() {
      if (window.ethereum) {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider);
      } else {
        console.error("No web3 provider available");
      }
    }
    setupProvider();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormInput(prev => ({ ...prev, [name]: value }));
  }

  async function submitProjectData(e) {
    e.preventDefault();

    if (!contract || !provider) {
      alert("Please ensure you're connected to MetaMask and the contract is loaded.");
      return;
    }

    try {
      const goalInWei = ethers.utils.parseEther(formInput.goal.toString());
      const durationInMinutes = ethers.BigNumber.from(formInput.duration);

      const txParams = [
        formInput.projectName,
        formInput.description,
        formInput.creatorName,
        formInput.link,
        formInput.image,
        goalInWei,
        durationInMinutes,
        ethers.BigNumber.from(formInput.category),
        ethers.BigNumber.from(formInput.refundPolicy)
      ];

      const gasEstimate = await contract.estimateGas.createNewProject(...txParams);

      const txOptions = {
        gasLimit: gasEstimate.mul(ethers.BigNumber.from(12)).div(ethers.BigNumber.from(10)),
        gasPrice: await provider.getGasPrice()
      };

      const txn = await contract.createNewProject(...txParams, txOptions);

      await txn.wait();
      alert("Artist registration complete!");
      setFormInput({
        projectName: "",
        description: "",
        link: "",
        goal: "",
        duration: "",
        category: "3",
        refundPolicy: "1",
      });
    } catch (error) {
      console.error("Detailed error:", error);
      alert("Error on calling function: " + (error.reason || error.message || error));
    }
  }





  return (
    <div className="create-form w-full flex items-center justify-center bg-transparent">
    <form onSubmit={submitProjectData} className="w-full max-w-2xl bg-slate-950 border-2 border-orange-400 rounded-lg border-double p-12">
      <h1 className="font-bold uppercase tracking-wider text-3xl text-center">Register New Artist</h1>
        
        <div className="m-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artist Name</label>
          <input
            name="projectName"
            value={formInput.projectName}
            placeholder="Enter the artist name"
            required
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="m-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artist Description</label>
          <textarea
            name="description"
            value={formInput.description}
            placeholder="Enter artist description"
            required
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        
        <div className="m-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image Link</label>
          <input
            type="url"
            name="link"
            value={formInput.link}
            placeholder="Enter link for artist image"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex justify-between w-full px-8">
          <div>
            <label htmlFor="goal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Funding Goal (LineaETH)</label>
            <div className="max-w-[18rem] mx-auto flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                  </svg>
                </div>
                <input 
                  type="number"
                  step="0.000000000000000001"
                  name="goal"
                  value={formInput.goal}
                  placeholder="Enter goal"
                  min="0.000000000000000001"
                  required
                  onChange={handleChange}
                  className="block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                />
              </div>
              <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                ETH
              </span>
            </div>
          </div>
          
          <div>
            <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration (Minutes):</label>
            <input 
              type="number"
              name="duration"
              value={formInput.duration}
              placeholder="30"
              min="1"
              required
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
       
        <div className="flex w-full justify-center pt-12">
        <button 
          type="submit" 
          className="uppercase tracking-wide py-3 px-7 text-xl border rounded-md hover:bg-orange-700 hover:border-orange-700 duration-100 ease-in cursor-pointer"
        >
          Register
        </button>
      </div>
    </form>
  </div>
  );
}

export default CreateProjectComponent;