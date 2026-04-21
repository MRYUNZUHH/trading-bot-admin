// Fix for logout redirect
if (typeof window !== 'undefined') {
  const originalPush = window.history.pushState;
  window.history.pushState = function() {
    return originalPush.apply(this, arguments);
  };
  
  // Fix logout function
  window.logout = function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.replace('/login');
  };
}
