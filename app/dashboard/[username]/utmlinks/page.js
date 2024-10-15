"use client"
import Header from '@/app/components/header';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function UTMLinks() {
  const params = useParams(); // Get dynamic route params
  const [username, setUsername] = useState(''); // Local state for the username
  const [links, setLinks] = useState([]); // To store all the links
  const [utmLinks, setUtmLinks] = useState([]); // To store all the links
  const [copiedIndexes, setCopiedIndexes] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && params?.username) {
      setUsername(params.username);
    }
  }, [params?.username]);

  useEffect(() => {
    // Simulate fetching links from Google Analytics
    setLinks([
      "https://dailyjugarr.com/mountain-tragedy-unfolds-climbers-fatal-plunge-in-denali-national-park/",
      "https://dailyjugarr.com/israeli-minister-ben-gvir-hurt-in-car-accident-near-suspected-attack-scene/"
    ]);
  }, []);

  useEffect(() => {
    if (links.length > 0 && username) {
      const updatedLinks = links.map((link) => {
        link = link.split("?utm_campaign")[0];
        if (link.endsWith("/")) { link = link.slice(0, -1); }
        let newLink = break_address(link);
        if (newLink) {
          return `${link}?utm_campaign=${newLink.title}_${username}&utm_medium=link&utm_source=link_${username}`;
        }
        return link;
      });
      setUtmLinks(updatedLinks);
    }
  }, [links, username]);

  // Prevent rendering until username is available
  if (!username) {
    return (
      <div role="status" className="w-screen h-screen flex justify-center items-center">
        <svg aria-hidden="true" className="inline w-20 h-20 animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
    );
  }

  // Utility to break the address into components
  function break_address(url_add) {
    const data = url_add.split("://");
    const protocol = data[0];
    const domainData = data[1].split(".com");
    const domain = domainData[0];
    const pathData = domainData[1].split("/");
    const title = pathData[1].split("-").slice(0, 3).join("-");

    return {
      protocol: protocol,
      domain: domain,
      title: title,
    };
  }
  const copy = (text, index) => {
    navigator.clipboard.writeText(text)
    // Add the index to the copiedIndexes array if it's not already present
    if (!copiedIndexes.includes(index)) {
      setCopiedIndexes([...copiedIndexes, index]);
    }
  }
  return (
    <>
      <Header />
      <h1 className='font-bold text-5xl text-white text-center m-4'>Latest Articles Links</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80vw] mx-auto my-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-white bg-gray-800">
            Articles
            <p className="mt-1 text-sm font-normal text-gray-400">Just click on the box to copy url with UTM</p>
          </caption>
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Links</th>
            </tr>
          </thead>
          <tbody>
            {utmLinks.length > 0 && utmLinks.map((link, index) => {
              const isCopied = copiedIndexes.includes(index);
              return (
                <tr key={index} className={`cursor-pointer border-b bg-gray-800 border-gray-700 ${isCopied ? 'bg-gray-700 text-gray-600' : 'bg-gray-800 text-gray-900 hover:bg-gray-600'}`}>
                  <th scope="row" className={`w-6 px-6 py-4 font-medium whitespace-nowrap ${isCopied ? 'text-gray-600' : 'text-white'}`}>{index + 1}</th>
                  <td className={`px-6 py-4 font-medium ${isCopied ? 'text-gray-600' : 'text-blue-500 hover:underline'}`} onClick={() => { copy(link, index) }}>
                    <p className="">
                      {link}
                    </p>
                  </td>
                </tr>
              )
            })}
            {utmLinks.length <= 0 &&
              <tr className="cursor-pointer border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                <th scope="row" className="w-6 px-6 py-4 font-medium whitespace-nowrap text-white">0</th>
                <td className="px-6 py-4">
                  <p className="font-medium text-white text-center">
                    NO Article Available!
                  </p>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

    </>
  );
}
