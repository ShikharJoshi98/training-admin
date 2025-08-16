import { users } from "../../utils/Users"

const Users = () => {
    return (
        <div className='p-0 pb-10 sm:p-8'>
            <h1 className='text-3xl text-white mt-10 sm:mt-0 text-center font-semibold'>Users</h1>
            <div className="overflow-x-auto mt-10">
                <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-white/10 text-white text-sm">
                            <th className="py-2 px-4 border">S.NO</th>
                            <th className="py-2 px-4 border">NAME</th>
                            <th className="py-2 px-4 border">CONTACT NO.</th>
                            <th className="py-2 px-4 border">ENQUIRY ABOUT</th>
                            <th className="py-2 px-4 border">TYPE</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/5 text-white text-sm">
                        {
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{index + 1}.</td>
                                    <td className="py-2 px-4 text-center">{user?.name}</td>
                                    <td className="py-2 px-4 text-center">{user?.phone}</td>
                                    <td className="py-2 px-4 text-center">{user?.enquiryAbout}</td>
                                    <td className="py-2 px-4 text-center">{user?.type}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users