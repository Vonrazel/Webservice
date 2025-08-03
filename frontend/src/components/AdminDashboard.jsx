import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEye, FaCheck, FaTimes, FaTrash, FaFilter, FaSearch, 
  FaStar, FaEnvelope, FaCalendar, FaDollarSign, FaHandshake,
  FaChartBar, FaUsers, FaThumbsUp, FaClock, FaSignOutAlt
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    service: ''
  });
  const [selectedReview, setSelectedReview] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [auth, setAuth] = useState({
    email: '',
    password: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchReviews();
      fetchAnalytics();
    }
  }, [isAuthenticated, currentPage, filters]);

  const fetchReviews = async () => {
    // Simulate fetching reviews with demo data
    setTimeout(() => {
      const demoReviews = [
        {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          service: "System Development",
          rating: 5,
          comment: "Exceptional work! My capstone project was delivered ahead of schedule with outstanding quality.",
          status: "approved",
          createdAt: "2024-01-15T10:30:00Z",
          project: "E-Learning Management System",
          university: "University of Technology"
        },
        {
          id: 2,
          name: "Michael Chen",
          email: "michael.chen@email.com",
          service: "Website Development",
          rating: 5,
          comment: "Outstanding service! They transformed my thesis into a professional-grade application.",
          status: "pending",
          createdAt: "2024-01-14T14:20:00Z",
          project: "Inventory Management System",
          university: "State University"
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          email: "emily.rodriguez@email.com",
          service: "Database Design",
          rating: 4,
          comment: "Professional team with exceptional technical skills. Excellent communication throughout.",
          status: "approved",
          createdAt: "2024-01-13T09:15:00Z",
          project: "Healthcare Database System",
          university: "Technical Institute"
        },
        {
          id: 4,
          name: "David Kim",
          email: "david.kim@email.com",
          service: "API Integration",
          rating: 5,
          comment: "Outstanding quality and attention to detail. Will definitely work with them again.",
          status: "pending",
          createdAt: "2024-01-12T16:45:00Z",
          project: "E-Commerce Platform",
          university: "Engineering University"
        }
      ];
      
      // Apply filters
      let filteredReviews = demoReviews;
      if (filters.status) {
        filteredReviews = filteredReviews.filter(review => review.status === filters.status);
      }
      if (filters.service) {
        filteredReviews = filteredReviews.filter(review => review.service === filters.service);
      }
      
      setReviews(filteredReviews);
    }, 1000);
  };

  const fetchAnalytics = async () => {
    // Simulate fetching analytics with demo data
    setTimeout(() => {
      setAnalytics({
        totalReviews: 156,
        averageRating: 4.8,
        totalClients: 89,
        recentSubmissions: 12,
        ratingDistribution: {
          5: 45,
          4: 35,
          3: 15,
          2: 3,
          1: 2
        },
        serviceBreakdown: {
          "System Development": 40,
          "Website Development": 30,
          "Database Design": 20,
          "API Integration": 10
        }
      });
      setLoading(false);
    }, 1500);
  };

  const updateReviewStatus = async (reviewId, status) => {
    // Simulate updating review status
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, status, adminResponse: status === 'approved' ? adminResponse : '' }
          : review
      )
    );
    
    setSelectedReview(null);
    setAdminResponse('');
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    // Simulate deleting review
    setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    
    // Simple authentication - you can change these credentials
    if (auth.email === 'admin@capstone-thesis.com' && auth.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setAuthError('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuth({ email: '', password: '' });
    setAuthError('');
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: '#ff9800', bgColor: '#fff3e0', text: 'Pending' },
      approved: { color: '#4caf50', bgColor: '#e8f5e8', text: 'Approved' },
      rejected: { color: '#f44336', bgColor: '#ffebee', text: 'Rejected' }
    };
    const badge = badges[status] || { color: '#9e9e9e', bgColor: '#f5f5f5', text: status };
    
    return (
      <span style={{
        backgroundColor: badge.bgColor,
        color: badge.color,
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        border: `1px solid ${badge.color}`
      }}>
        {badge.text}
      </span>
    );
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center'
          }}
        >
          <h2 style={{ 
            color: '#2c3e50', 
            marginBottom: '30px',
            fontSize: '28px',
            fontWeight: '600'
          }}>
            🔐 Admin Login
          </h2>
          <form onSubmit={handleAuth}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#555',
                fontWeight: '500'
              }}>
                Email
              </label>
              <input
                type="email"
                value={auth.email}
                onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '10px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                placeholder="admin@capstone-thesis.com"
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#555',
                fontWeight: '500'
              }}>
                Password
              </label>
              <input
                type="password"
                value={auth.password}
                onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '10px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                placeholder="••••••••"
              />
            </div>
            {authError && (
              <div style={{
                color: '#dc3545',
                fontSize: '14px',
                marginBottom: '20px',
                padding: '10px',
                backgroundColor: '#f8d7da',
                borderRadius: '8px',
                border: '1px solid #f5c6cb'
              }}>
                {authError}
              </div>
            )}
            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6fd8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              Login to Admin Panel
            </button>
          </form>
          <div style={{
            marginTop: '20px',
            fontSize: '12px',
            color: '#6c757d'
          }}>
            <p>Demo Credentials:</p>
            <p><strong>Email:</strong> admin@capstone-thesis.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f9fa'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#667eea',
          fontSize: '18px'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
                 <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           style={{
             background: 'white',
             borderRadius: '20px',
             padding: '30px',
             marginBottom: '30px',
             boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center'
           }}
         >
           <h1 style={{
             color: '#2c3e50',
             margin: 0,
             fontSize: '32px',
             fontWeight: '700'
           }}>
             📊 Admin Dashboard
           </h1>
           <button 
             onClick={handleLogout}
             style={{
               padding: '12px 24px',
               backgroundColor: '#dc3545',
               color: 'white',
               border: 'none',
               borderRadius: '10px',
               cursor: 'pointer',
               display: 'flex',
               alignItems: 'center',
               gap: '8px',
               fontWeight: '500',
               transition: 'background-color 0.3s ease',
               fontSize: '14px'
             }}
             onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
             onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
           >
             <FaSignOutAlt />
             Logout
           </button>
         </motion.div>

        {/* Analytics Overview */}
                 <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
             gap: '20px',
             marginBottom: '30px'
           }}
         >
          {[
            { icon: <FaUsers />, value: analytics.totalReviews || 0, label: 'Total Reviews', color: '#667eea' },
            { icon: <FaClock />, value: analytics.pendingReviews || 0, label: 'Pending Reviews', color: '#ff9800' },
            { icon: <FaCheck />, value: analytics.approvedReviews || 0, label: 'Approved Reviews', color: '#4caf50' },
            { icon: <FaStar />, value: analytics.averageRating?.toFixed(1) || 0, label: 'Average Rating', color: '#ffc107' },
            { icon: <FaThumbsUp />, value: analytics.recommendationRate?.toFixed(1) || 0, label: 'Recommendation Rate', color: '#9c27b0' }
          ].map((card, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                padding: '25px',
                borderRadius: '15px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                textAlign: 'center',
                border: `2px solid ${card.color}20`
              }}
            >
              <div style={{
                fontSize: '32px',
                color: card.color,
                marginBottom: '10px'
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#2c3e50',
                margin: '0 0 5px 0'
              }}>
                {card.value}
                {card.label.includes('Rate') ? '%' : ''}
              </h3>
              <p style={{
                color: '#6c757d',
                margin: 0,
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {card.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
        >
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#2c3e50',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            🔍 Filters
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#555',
                fontWeight: '500'
              }}>
                Status:
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '10px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#555',
                fontWeight: '500'
              }}>
                Service:
              </label>
              <select
                value={filters.service}
                onChange={(e) => setFilters({ ...filters, service: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '10px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              >
                <option value="">All Services</option>
                <option value="System Development">System Development</option>
                <option value="Website Development">Website Development</option>
                <option value="Database Design">Database Design</option>
                <option value="API Integration">API Integration</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Reviews Table */}
                 <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.6 }}
           style={{
             background: 'white',
             borderRadius: '15px',
             padding: '25px',
             boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
             overflow: 'auto',
             maxWidth: '100%'
           }}
         >
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#2c3e50',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            📋 Reviews
          </h3>
                     <table style={{
             width: '100%',
             borderCollapse: 'collapse',
             fontSize: '14px',
             minWidth: '800px'
           }}>
            <thead>
              <tr style={{
                borderBottom: '2px solid #e1e8ed'
              }}>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>Name</th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>Service</th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>Rating</th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>Status</th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>Date</th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} style={{
                  borderBottom: '1px solid #f1f3f4'
                }}>
                  <td style={{
                    padding: '15px',
                    color: '#2c3e50',
                    fontWeight: '500'
                  }}>{review.name}</td>
                  <td style={{
                    padding: '15px',
                    color: '#6c757d'
                  }}>{review.service}</td>
                                     <td style={{
                     padding: '15px',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '5px'
                   }}>
                     {review.rating}/5
                     <FaStar style={{ color: '#ffc107' }} />
                   </td>
                  <td style={{
                    padding: '15px'
                  }}>{getStatusBadge(review.status)}</td>
                  <td style={{
                    padding: '15px',
                    color: '#6c757d'
                  }}>{new Date(review.createdAt).toLocaleDateString()}</td>
                  <td style={{
                    padding: '15px'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <button
                        onClick={() => setSelectedReview(review)}
                        title="View Details"
                        style={{
                          padding: '8px',
                          backgroundColor: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <FaEye />
                      </button>
                      {review.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateReviewStatus(review.id, 'approved')}
                            title="Approve"
                            style={{
                              padding: '8px',
                              backgroundColor: '#4caf50',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => updateReviewStatus(review.id, 'rejected')}
                            title="Reject"
                            style={{
                              padding: '8px',
                              backgroundColor: '#f44336',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        title="Delete"
                        style={{
                          padding: '8px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Review Detail Modal */}
        {selectedReview && (
          <div 
            onClick={() => setSelectedReview(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
          >
                         <div 
               onClick={(e) => e.stopPropagation()}
               style={{
                 background: 'white',
                 borderRadius: '20px',
                 padding: '30px',
                 maxWidth: '700px',
                 width: '90%',
                 maxHeight: '85vh',
                 overflow: 'auto'
               }}
             >
              <h2 style={{
                color: '#2c3e50',
                marginBottom: '25px',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                📋 Review Details
              </h2>
              <div style={{
                display: 'grid',
                gap: '15px',
                marginBottom: '25px'
              }}>
                                 {[
                   { label: 'Name', value: selectedReview.name },
                   { label: 'Email', value: selectedReview.email },
                   { label: 'Service', value: selectedReview.service },
                   { label: 'Rating', value: `${selectedReview.rating}/5` },
                   { label: 'Project', value: selectedReview.project },
                   { label: 'University', value: selectedReview.university },
                   { label: 'Status', value: selectedReview.status },
                   { label: 'Date', value: new Date(selectedReview.createdAt).toLocaleDateString() }
                 ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid #f1f3f4'
                  }}>
                    <strong style={{ color: '#2c3e50' }}>{item.label}:</strong>
                    <span style={{ color: '#6c757d' }}>{item.value}</span>
                  </div>
                ))}
                                 <div style={{
                   padding: '15px',
                   backgroundColor: '#f8f9fa',
                   borderRadius: '10px',
                   marginTop: '10px'
                 }}>
                   <strong style={{ color: '#2c3e50' }}>Comment:</strong>
                   <p style={{ 
                     margin: '10px 0 0 0',
                     color: '#6c757d',
                     fontStyle: 'italic'
                   }}>{selectedReview.comment}</p>
                 </div>
                
              </div>
              
              {selectedReview.status === 'pending' && (
                <div style={{
                  borderTop: '2px solid #e1e8ed',
                  paddingTop: '20px'
                }}>
                  <h3 style={{
                    margin: '0 0 15px 0',
                    color: '#2c3e50',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    💬 Admin Response (Optional)
                  </h3>
                  <textarea
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    placeholder="Enter your response to this review..."
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '10px',
                      fontSize: '14px',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '20px'
                  }}>
                    <button
                      onClick={() => updateReviewStatus(selectedReview.id, 'approved')}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateReviewStatus(selectedReview.id, 'rejected')}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setSelectedReview(null)}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 