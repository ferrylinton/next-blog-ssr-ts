import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import { useRouter } from 'next/router';

type Props = {
    editPageUrl: string,
    showDeleteConfirmation: () => void
}

const ButtonActions = ({ editPageUrl, showDeleteConfirmation }: Props) => {

    const router = useRouter();

    return <div className='btn-box'>
        <button className='btn-edit' onClick={() => router.push(editPageUrl)}><EditIcon /></button>
        <button className='btn-delete' onClick={showDeleteConfirmation}><DeleteIcon /></button>
    </div>


}

export default ButtonActions