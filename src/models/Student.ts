import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
	nim: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Students', StudentSchema);
