import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Send, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-gray-50 dark:bg-dark-light border-t border-gray-200 dark:border-gray-700 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 gradient-bg-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-lg font-bold gradient-text">Learnify</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Empowering learners worldwide with cutting-edge online education.
            </p>
            <div className="flex gap-3 mt-4">
              {[Globe, Send, Mail].map((Icon, i) => (
                <div key={i} className="p-2 bg-gray-200 dark:bg-dark rounded-lg hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              {['Home', 'Courses', 'Dashboard', 'Profile'].map(link => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              {['Web Development', 'Data Science', 'Design', 'Marketing'].map(cat => (
                <li key={cat}>
                  <Link to="/courses" className="hover:text-primary transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
              <li>
                <Link to="/admin/login" className="hover:text-primary transition-colors">Admin</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          &copy; 2026 Learnify. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}
