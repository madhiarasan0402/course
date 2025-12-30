import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import bgImage from '../assets/bg-edu.jpg';

const StudentForm = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        education_path: '12th', // Default
        marks_10th: '',
        marks_12th: '',
        sports_participation: 'No',
        sports_description: '',
        interested_keywords: '',
        extra_curricular: '',
        marksheet_10th: null,
        marksheet_12th: null,
        sports_cert: null,
        extra_curr_cert: null
    });

    // Prefill data if editing
    useEffect(() => {
        const fetchCurrentData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/student/details/${user.username}`);
                if (res.data) {
                    setFormData(prev => ({
                        ...prev,
                        ...res.data,
                        marks_10th: res.data.marks_10th || '',
                        marks_12th: res.data.marks_12th || '',
                        age: res.data.age || '',
                        // Keep file inputs null as we can't prefill them for security
                    }));
                }
            } catch (err) {
                console.log("No existing data or error fetching.", err);
            }
        };
        if (user) fetchCurrentData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const data = new FormData();
        data.append('username', user.username);
        Object.keys(formData).forEach(key => {
            if (formData[key]) data.append(key, formData[key]);
        });

        try {
            await axios.post('http://localhost:5000/api/student/submit', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/dashboard');
        } catch (err) {
            alert('Submission failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        section: "space-y-4 mb-8 p-4 glass-panel bg-white/5",
        heading: "text-xl font-semibold mb-4 text-primary text-center pb-2 border-b border-white/10",
        pageBackground: {
            backgroundColor: "#0f172a",
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.7)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-4" style={styles.pageBackground}>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel w-full max-w-3xl p-8 relative overflow-hidden"
            >

                <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8 border-b border-gray-700 pb-4">
                    <div className="flex justify-start">
                        <button onClick={() => { logout(); navigate('/'); }} className="btn text-sm py-2 px-4 shadow-lg hover:brightness-110" style={{ backgroundColor: '#2563eb', color: 'white' }}>Log Out</button>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl m-0 leading-none mb-2">Student Profile</h1>
                        <p className="text-sm text-gray-400">Please complete all sections below</p>
                    </div>
                    <div></div>
                </div>

                <div className="space-y-8">
                    {/* Personal Details */}
                    <div className={styles.section}>
                        <h2 className={styles.heading}>
                            <span className="section-icon">👤</span>Personal Details
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 spotlight-group">
                            <div>
                                <label className="block text-sm mb-1 text-gray-300 text-center">Full Name</label>
                                <input name="name" value={formData.name} onChange={handleChange} className="input-field text-center" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-gray-300 text-center">Age</label>
                                <input name="age" type="number" value={formData.age} onChange={handleChange} className="input-field text-center" />
                            </div>
                        </div>
                    </div>

                    {/* Education Path */}
                    <div className={styles.section}>
                        <h2 className={styles.heading}>
                            <span className="section-icon">🎓</span>Education Path
                        </h2>
                        <div className="flex gap-4 justify-center spotlight-group">
                            <label className={`flex items-center gap-2 cursor-pointer p-4 rounded-2xl transition border ${formData.education_path === '12th' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-transparent hover:bg-white/10'}`}>
                                <input type="radio" name="education_path" value="12th" checked={formData.education_path === '12th'} onChange={handleChange} />
                                12th Std
                            </label>
                            <label className={`flex items-center gap-2 cursor-pointer p-4 rounded-2xl transition border ${formData.education_path === 'Diploma' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-transparent hover:bg-white/10'}`}>
                                <input type="radio" name="education_path" value="Diploma" checked={formData.education_path === 'Diploma'} onChange={handleChange} />
                                Diploma
                            </label>
                        </div>
                    </div>

                    {/* Academic Performance */}
                    <div className={styles.section}>
                        <h2 className={styles.heading}>
                            <span className="section-icon">📊</span>Academic Performance
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 spotlight-group">
                            <div>
                                <label className="block text-sm mb-1 text-gray-300 text-center">10th Marks (%)</label>
                                <input name="marks_10th" type="number" value={formData.marks_10th} onChange={handleChange} className="input-field text-center" />
                            </div>
                            {formData.education_path === '12th' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <label className="block text-sm mb-1 text-gray-300 text-center">12th Marks (%)</label>
                                    <input name="marks_12th" type="number" value={formData.marks_12th} onChange={handleChange} className="input-field text-center" />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Sports */}
                    <div className={styles.section}>
                        <h2 className={styles.heading}>
                            <span className="section-icon">🏆</span>Sports
                        </h2>
                        <div className="flex gap-4 mb-4 justify-center spotlight-group">
                            <label className={`flex items-center gap-2 cursor-pointer p-2 px-6 rounded-2xl transition border ${formData.sports_participation === 'Yes' ? 'bg-success/20 border-success' : 'bg-white/5 border-transparent'}`}>
                                <input type="radio" name="sports_participation" value="Yes" checked={formData.sports_participation === 'Yes'} onChange={handleChange} /> Yes
                            </label>
                            <label className={`flex items-center gap-2 cursor-pointer p-2 px-6 rounded-2xl transition border ${formData.sports_participation === 'No' ? 'bg-error/20 border-error' : 'bg-white/5 border-transparent'}`}>
                                <input type="radio" name="sports_participation" value="No" checked={formData.sports_participation === 'No'} onChange={handleChange} /> No
                            </label>
                        </div>
                        {formData.sports_participation === 'Yes' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <label className="block text-sm mb-1 text-gray-300 text-center">Sports Achievements / Description</label>
                                <textarea name="sports_description" value={formData.sports_description} onChange={handleChange} className="input-field min-h-[100px]" />
                            </motion.div>
                        )}
                    </div>

                    {/* Interests */}
                    <div className={styles.section}>
                        <h2 className={styles.heading}>
                            <span className="section-icon">🎨</span>Interests
                        </h2>
                        <div className="grid md:grid-cols-1 gap-4 spotlight-group">
                            <div>
                                <label className="block text-sm mb-1 text-gray-300 text-center">Interested Field</label>
                                <input name="interested_keywords" value={formData.interested_keywords} onChange={handleChange} className="input-field text-center" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-gray-300 text-center">Extra Curricular Activities</label>
                                <input name="extra_curricular" value={formData.extra_curricular} onChange={handleChange} className="input-field text-center" />
                            </div>
                        </div>
                    </div>

                    {/* Documents Upload */}
                    <div className={styles.section}>
                        <h2 className={styles.heading}>
                            <span className="section-icon">📂</span>Documents Upload
                        </h2>
                        <div className="grid md:grid-cols-1 gap-4 spotlight-group">
                            <div>
                                <label className="block text-sm mb-1 text-gray-300 text-center">10th Marksheet (pdf) *</label>
                                <input type="file" name="marksheet_10th" onChange={handleFileChange} className="input-field text-center" accept=".pdf" />
                            </div>
                            {formData.education_path === '12th' && (
                                <div>
                                    <label className="block text-sm mb-1 text-gray-300 text-center">12th Marksheet (pdf) *</label>
                                    <input type="file" name="marksheet_12th" onChange={handleFileChange} className="input-field text-center" accept=".pdf" />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm mb-1 text-gray-300 text-center">Sports Certificate (pdf) (Optional)</label>
                                <input type="file" name="sports_cert" onChange={handleFileChange} className="input-field text-center" accept=".pdf" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-gray-300 text-center">Extra Curricular Certificate (pdf) (Optional)</label>
                                <input type="file" name="extra_curr_cert" onChange={handleFileChange} className="input-field text-center" accept=".pdf" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-8 border-t border-gray-700 mt-4">
                    <button onClick={handleSubmit} disabled={loading} className="btn btn-primary w-full max-w-sm text-lg py-3 shadow-lg hover:shadow-primary/50">
                        {loading ? 'Submitting...' : 'Submit Profile'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentForm;
