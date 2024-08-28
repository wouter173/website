export const Contact = () => {
  return (
    <>
      <div className="relative z-20 mx-auto  w-full max-w-4xl rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] py-8 shadow-sm">
        <div className="flex flex-col gap-6 px-8">
          <h2 className="col-span-2 text-left text-2xl font-semibold text-neutral-100">Reach out with a message&hellip;</h2>

          <form action="">
            <fieldset>
              <div>
                <label htmlFor="">
                  <input type="text" />
                </label>
                <label htmlFor="">
                  <input type="text" />
                </label>
              </div>
              <textarea name="" id=""></textarea>
            </fieldset>
            <button type="submit" className="text-white">
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-4xl grid-cols-[1fr_1fr] gap-8 text-white">
        <div className="relative z-20 mx-auto w-full rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] py-8 text-white shadow-sm">
          &hellip; follow me on X &hellip;
        </div>

        <div className="relative z-20 mx-auto w-full rounded-3xl border border-[#1F1F1F] bg-[#0A0A0B] py-8 text-white shadow-sm">
          &hellip; or follow me on github.
        </div>
      </div>
    </>
  )
}
