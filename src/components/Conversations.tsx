import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Filter, 
  Download,
  Calendar,
  User,
  TrendingUp,
  TrendingDown,
  Minus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import styles from './Conversations.module.scss';

interface Conversation {
  id: number;
  time: string;
  date: string;
  conversationId: string;
  owner: string;
  account: string;
  score: number;
  scoreTrend: 'up' | 'down' | 'stable';
  previousScore?: number;
  tags: string;
}

export function Conversations() {
  const router = useRouter();
  const [selectedAgent, setSelectedAgent] = useState('All Agents');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedQuality, setSelectedQuality] = useState('All Quality');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const conversations: Conversation[] = [
    {
      id: 1,
      time: "10:30 AM",
      date: "2024-01-15",
      conversationId: "js-rkoq-pco",
      owner: "Priya Sharma",
      account: "Account",
      score: 95,
      scoreTrend: 'up',
      previousScore: 92,
      tags: "Google Calendar"
    },
    {
      id: 2,
      time: "11:15 AM",
      date: "2024-01-15",
      conversationId: "dgg-nisd-aie",
      owner: "Kavya Reddy",
      account: "Account",
      score: 92,
      scoreTrend: 'down',
      previousScore: 96,
      tags: "Google Calendar"
    },
    {
      id: 3,
      time: "2:20 PM",
      date: "2024-01-15",
      conversationId: "abm-fwhk-Int",
      owner: "Arjun Patel",
      account: "Account",
      score: 88,
      scoreTrend: 'stable',
      previousScore: 88,
      tags: "Google Calendar"
    },
    {
      id: 4,
      time: "3:45 PM",
      date: "2024-01-15",
      conversationId: "xyz-123-abc",
      owner: "Sneha Gupta",
      account: "Account",
      score: 96,
      scoreTrend: 'up',
      previousScore: 91,
      tags: "Google Calendar"
    },
    {
      id: 5,
      time: "4:30 PM",
      date: "2024-01-15",
      conversationId: "def-456-ghi",
      owner: "Lalit Bal",
      account: "Account",
      score: 89,
      scoreTrend: 'down',
      previousScore: 91,
      tags: "Google Calendar"
    },
    {
      id: 6,
      time: "5:15 PM",
      date: "2024-01-15",
      conversationId: "jkl-789-mno",
      owner: "Ravi Kumar",
      account: "Account",
      score: 94,
      scoreTrend: 'up',
      previousScore: 88,
      tags: "Google Calendar"
    },
    {
      id: 7,
      time: "6:00 PM",
      date: "2024-01-15",
      conversationId: "pqr-012-stu",
      owner: "Meera Joshi",
      account: "Account",
      score: 87,
      scoreTrend: 'down',
      previousScore: 88,
      tags: "Google Calendar"
    },
    {
      id: 8,
      time: "7:30 PM",
      date: "2024-01-15",
      conversationId: "vwx-345-yza",
      owner: "Vikash Agarwal",
      account: "Account",
      score: 91,
      scoreTrend: 'up',
      previousScore: 87,
      tags: "Google Calendar"
    },
    {
      id: 9,
      time: "8:15 PM",
      date: "2024-01-15",
      conversationId: "bcd-678-efg",
      owner: "Anita Desai",
      account: "Account",
      score: 93,
      scoreTrend: 'up',
      previousScore: 91,
      tags: "Google Calendar"
    }
  ];

  // Filter conversations based on selected filters
  const filteredConversations = conversations.filter(conv => {
    if (selectedAgent !== 'All Agents' && conv.owner !== selectedAgent) return false;
    if (selectedCategory !== 'All Categories') return true; // Add category filtering logic
    if (selectedStatus !== 'All Status') return true; // Add status filtering logic
    if (selectedQuality !== 'All Quality') return true; // Add quality filtering logic
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredConversations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedConversations = filteredConversations.slice(startIndex, endIndex);

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    // Navigate to conversation details page
    router.push(`/conversations/${conversation.conversationId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return styles.scoreRed;
    if (score >= 80) return styles.scoreYellow;
    return styles.scoreGreen;
  };

  return (
    <div className={styles.conversationsContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Conversation Analytics Dashboard</h1>
        <p className={styles.headerSubtitle}>Monitor and analyze team conversations with detailed insights</p>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>Filter by:</div>
        <div className={styles.filterDropdowns}>
            <select 
            className={styles.filterSelect}
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              <option value="All Agents">All Agents</option>
              <option value="Priya Sharma">Priya Sharma</option>
              <option value="Kavya Reddy">Kavya Reddy</option>
              <option value="Arjun Patel">Arjun Patel</option>
              <option value="Sneha Gupta">Sneha Gupta</option>
            <option value="Lalit Bal">Lalit Bal</option>
            <option value="Ravi Kumar">Ravi Kumar</option>
            <option value="Meera Joshi">Meera Joshi</option>
            <option value="Vikash Agarwal">Vikash Agarwal</option>
            <option value="Anita Desai">Anita Desai</option>
          </select>

          <select 
            className={styles.filterSelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Billing Support">Billing Support</option>
            <option value="Product Inquiry">Product Inquiry</option>
            <option value="Sales">Sales</option>
            </select>

          <select 
            className={styles.filterSelect}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Resolved">Resolved</option>
            <option value="In Progress">In Progress</option>
            <option value="Escalated">Escalated</option>
            </select>

          <select 
            className={styles.filterSelect}
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
          >
            <option value="All Quality">All Quality</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
            </select>
          </div>

        <div className={styles.filterActions}>
          <button className={styles.filterButton}>
            <Filter className={styles.filterIcon} />
            Advanced Filters
          </button>
          <button className={styles.exportButton}>
            <Download className={styles.exportIcon} />
            Export
          </button>
        </div>
      </div>

      {/* Conversations Table */}
      <div className={styles.tableContainer}>
        <div className="overflow-x-auto">
          <table className={styles.conversationsTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Name and Details</th>
                <th className={styles.tableHeaderCell}>Agent</th>
                <th className={styles.tableHeaderCell}>Account</th>
                <th className={styles.tableHeaderCell}>Score</th>
                <th className={styles.tableHeaderCell}>Trend</th>
                <th className={styles.tableHeaderCell}>Tags</th>
                <th className={styles.tableHeaderCell}>Action</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {paginatedConversations.map((conv) => (
                <tr
                  key={conv.id}
                  className={`${styles.tableRow} ${
                    selectedConversation?.id === conv.id ? styles.selectedRow : ''
                  }`}
                  onClick={() => handleConversationClick(conv)}
                >
                  <td className={styles.tableCell}>
                    <div className={styles.nameCell}>
                      <div className={styles.calendarIcon}>
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <div className={styles.nameDetails}>
                        <div className={styles.conversationName}>
                          {conv.time} {conv.date} - {conv.time}
                        </div>
                        <div className={styles.conversationId}>
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span>{conv.conversationId}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.agentCell}>
                      <User className={styles.userIcon} />
                      <span className={styles.agentName}>{conv.owner}</span>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.accountCell}>
                      <User className={styles.userIcon} />
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={`${styles.scoreValue} ${getScoreColor(conv.score)}`}>
                      {conv.score}%
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.trendCell}>
                      {conv.scoreTrend === 'up' && (
                        <div className={`${styles.trendCell} ${styles.trendPositive}`}>
                          <TrendingUp className={styles.trendIcon} />
                          <span className={styles.trendValue}>
                            +{conv.score - (conv.previousScore || conv.score)}
                          </span>
                      </div>
                    )}
                      {conv.scoreTrend === 'down' && (
                        <div className={`${styles.trendCell} ${styles.trendNegative}`}>
                          <TrendingDown className={styles.trendIcon} />
                          <span className={styles.trendValue}>
                            {conv.score - (conv.previousScore || conv.score)}
                      </span>
                  </div>
                      )}
                      {conv.scoreTrend === 'stable' && (
                        <div className={`${styles.trendCell} ${styles.trendNeutral}`}>
                          <Minus className={styles.trendIcon} />
                          <span className={styles.trendValue}>0</span>
                  </div>
                      )}
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.tagsCell}>{conv.tags}</div>
                  </td>
                  <td className={styles.tableCell}>
                    <button className={styles.actionButton}>
                      <MoreHorizontal className={styles.actionIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
                </div>

        {/* Pagination Controls */}
        <div className={styles.paginationControls}>
          <div className={styles.paginationInfo}>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredConversations.length)} of {filteredConversations.length} conversations
                    </div>
          <div className={styles.paginationButtons}>
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              <ChevronLeft className={styles.paginationIcon} />
              <span>Previous</span>
            </button>
          
            {/* Page Numbers */}
            <div className={styles.pageNumbers}>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`${styles.paginationButton} ${
                      currentPage === pageNum ? styles.activePage : ''
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              <span>Next</span>
              <ChevronRight className={styles.paginationIcon} />
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}