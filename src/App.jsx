import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import FeedPage from './pages/FeedPage'
import GroupsPage from './pages/GroupsPage'
import CreatePostPage from './pages/CreatePostPage'
import GroupDetailPage from './pages/GroupDetailPage'
import NotificationsPage from './pages/NotificationsPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/post" element={<CreatePostPage />} />
          <Route path="/groups/:id" element={<GroupDetailPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/trending" element={<FeedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App