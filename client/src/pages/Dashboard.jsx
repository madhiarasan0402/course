import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import bgImage from '../assets/bg-edu.jpg';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [details, setDetails] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get Details
                const detailsRes = await axios.get(`http://localhost:5000/api/student/details/${user.username}`);
                setDetails(detailsRes.data);

                if (detailsRes.data) {
                    // Get Recommendations
                    const recRes = await axios.post('http://localhost:5000/api/courses/recommend', {
                        education_path: detailsRes.data.education_path,
                        marks_10th: detailsRes.data.marks_10th,
                        marks_12th: detailsRes.data.marks_12th,
                        keywords: detailsRes.data.interested_keywords
                    });
                    setCourses(recRes.data);
                }
            } catch (err) {
                console.error("Error fetching dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;

    if (!details) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2>No details found.</h2>
                <a href="/form" className="btn btn-primary">Complete Profile</a>
                <button onClick={logout} className="btn bg-red-500/20 text-red-200">Logout</button>
            </div>
        );
    }

    const pageBackground = {
        backgroundColor: "#0f172a",
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.7)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
    };

    const calculateTier = () => {
        // Use 12th marks if available, otherwise fallback to 10th (for Diploma/10th cases)
        const score = parseFloat(details.marks_12th || details.marks_10th || 0);

        let tier = "Not Eligible";
        let color = "text-red-400";

        if (score > 80) {
            tier = "Tier 1 Colleges";
            color = "text-green-400";
        } else if (score > 60 && score <= 80) {
            tier = "Tier 2 Colleges";
            color = "text-yellow-400";
        } else if (score > 40 && score <= 60) {
            tier = "Tier 3 Colleges";
            color = "text-orange-400";
        }

        return { score: score.toFixed(2), tier, color };
    };

    const tierInfo = details ? calculateTier() : { score: 0, tier: '', color: '' };

    return (
        <div className="min-h-screen p-6 md:p-12 relative" style={pageBackground}>
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl md:text-5xl mb-2">
                        <span className="section-icon">👋</span>Hello, {details.name}
                    </h1>
                    <p className="text-gray-400">Here are your personalized course recommendations.</p>
                </div>
                <button onClick={logout} className="btn text-white shadow-lg shadow-blue-500/30 hover:brightness-110" style={{ backgroundColor: '#2563eb' }}>
                    Logout
                </button>
            </header>

            <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel p-6 cursor-pointer hover:bg-white/5 transition group"
                            onClick={() => navigate(`/course/${course.id}`, { state: { course } })}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition">{course.course_code}</h3>
                                <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono">Recommended</span>
                            </div>
                            <h4 className="text-lg text-gray-200 mb-2">{course.course_name}</h4>
                            <p className="text-sm text-gray-400 line-clamp-3">{course.description}</p>
                            <div className="mt-4 text-xs text-primary font-semibold">Click for Roadmap & Details →</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className="glass-panel p-6 mb-10 max-w-xl relative">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                    <h3 className="text-lg text-gray-300">Your Profile Summary</h3>
                    <button
                        onClick={() => navigate('/form')}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white"
                        title="Edit Profile"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Education:</span> {details.education_path}</div>
                    <div><span className="text-gray-500">Marks (10th):</span> {details.marks_10th}%</div>
                    {details.marks_12th && <div><span className="text-gray-500">Marks (12th):</span> {details.marks_12th}%</div>}
                    <div className="col-span-2"><span className="text-gray-500">Interests:</span> {details.interested_keywords}</div>

                    <div className="col-span-2 mt-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Score Used:</span>
                            <span className="text-xl font-bold text-white">{tierInfo.score}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Eligible For:</span>
                            <span className={`text-xl font-bold ${tierInfo.color}`}>{tierInfo.tier}</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;
