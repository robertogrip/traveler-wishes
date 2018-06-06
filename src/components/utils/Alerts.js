import { toast } from 'react-toastify';
const options = {
	hideProgressBar: true,
	position: toast.POSITION.TOP_CENTER
}

const alerts = {
	info: ( msg ) => {
		toast.info( msg, options )
	},
	error: ( msg ) => {
		toast.error( msg, options )
	},
	success: ( msg ) => {
		toast.success( msg, options )
	},
	warning: ( msg ) => {
		toast.warn( msg, options )
	}
}

export default {
	info: alerts.info,
	error: alerts.error,
	success: alerts.success,
	warning: alerts.warning
}