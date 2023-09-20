import React from "react";

export default function App() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [shortUrl, setShortUrl] = React.useState();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("https://ditto.deno.dev/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    setLoading(false);
    setShortUrl(data.url);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://em-content.zobj.net/source/apple/354/link_1f517.png"
            alt="shorty"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white  sm:leading-10">
            create short links easily
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="url"
                  name="url"
                  type="url"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  autoComplete="url"
                  placeholder="Enter URL here"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading..." : "Shorten"}
              </button>
            </div>
          </form>

          {shortUrl && (
            <div className="mt-10">
              <span className="bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold leading-6">
                Success
              </span>
              <div className="mt-2 flex">
                <input
                  id="url"
                  name="url"
                  type="url"
                  autoComplete="url"
                  placeholder="Enter URL here"
                  required
                  readOnly
                  className="block flex-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={shortUrl}
                />

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                  }}
                  className="flex justify-center  ml-3 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
}
