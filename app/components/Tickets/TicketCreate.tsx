import { addTicket } from "@/app/actions/tickets"
import { Priority } from "@/app/enum/priority"
import SubmitButton from "./SubmitButton"

const TicketCreate = () => {

  return (
    <div>
      <form action={addTicket} className="mx-auto max-w-md px-5 w-full flex flex-col gap-2 py-8">
        {/* {message && <div className="mb-2 text-red-500">{message}</div>} */}
        <div>
          <label htmlFor="title"></label>
          <input
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
            type="text"
            name="title"
            id="title"
            placeholder="title"
          />
        </div>
        <div>
          <label htmlFor="body"></label>
          <textarea
            className={`resize-y min-h-36 max-h-60 h-full w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
            name="body"
            id="body"
            maxLength={5000}
            placeholder="body"
          />
        </div>
        <div>
          <label htmlFor="priority"></label>
          <select
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
            name="priority"
            id="priority">
            <option value={Priority.LOW}>{Priority.LOW}</option>
            <option value={Priority.MEDIUM}>{Priority.MEDIUM}</option>
            <option value={Priority.HIGH}>{Priority.HIGH}</option>
          </select>
        </div>
        <div>
          <SubmitButton text="create ticket" textPending="creating"/>
        </div>
      </form>
    </div>
  )
}

export default TicketCreate
