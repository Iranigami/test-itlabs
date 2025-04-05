import { User } from '../redux/types'

type Props = {
  users: any;
  onUserClick: (id:string) => void;
  search: string;
  filter: string;
};


export default function MainTable({ users, onUserClick, filter, search }: Props) {
  const handleClickOnUser = (id:string) => {
        onUserClick(id);
    }

  const filteredUsers = users.filter((user: User) => {
    if (!search || user.name.toLowerCase().includes(search.toLowerCase())) {
      switch (filter) {
        case 'absent':
          {
            return !user.status;
          }
        case 'present':
          {
            return user.status;
          }
        default:
          {
            return true;
          }
      }
    } else {
      return false;
    }
  });
  

  return (
    <div className="justify-center w-[100vw] min-h-[90vh] p-[50px] mt-[89px]">
    <table className='text-black text-left w-full justify-center'>
      <thead className="text-[#4E3000] font-sans font-medium text-[20px] justify-between left-0 right-0 w-full">
        <tr className='w-full justify-between'>
          <th>Номер</th>
          <th>ФИО</th>
          <th>Компания</th>
          <th>Группа</th>
          <th className="justify-center text-center">Присутствие</th>
        </tr>
      </thead>
      <tbody className="text-[30px] border-t-[4px] border-[#E9E9E9]">
        
        {filteredUsers.map((user:User, index:number) => (
          <tr key={user.id} className="cursor-pointer h-[91px]" onClick={()=>{handleClickOnUser(user.id)}}>
            <td>{index+1}</td>
            <td>{user.name}</td>
            <td>{user.company}</td>
            <td>{user.group}</td>
            <td><div className={`w-[59px] h-[59px] rounded-[30px] mx-auto ${user.status ? 'bg-[#80BB00]' : 'bg-[#EC5937]'}`}></div></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};