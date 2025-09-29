import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Phone, 
  Clock, 
  AlertTriangle,
  Info,
  User
} from 'lucide-react';
import styles from './CallQualityAnalytics.module.scss';

export function CallQualityAnalytics() {

  return (
    <div className={styles.callQualityContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Call Quality Analytics</h1>
        <p className={styles.headerSubtitle}>Comprehensive call quality metrics and performance analysis based on WorkIndia standards</p>
      </div>

      {/* Scoring Rules Info */}
      <div className={styles.scoringRulesCard}>
        <div className={styles.scoringRulesContent}>
          <Info className={styles.scoringRulesIcon} />
          <div>
            <h3 className={styles.scoringRulesTitle}>Scoring Rules</h3>
            <div className={styles.scoringRulesList}>
              <p className={styles.scoringRulesItem}><strong>Fatal Errors:</strong> Single fatal error = 30% score reduction, Multiple fatal errors = 75% score reduction</p>
              <p className={styles.scoringRulesItem}><strong>Non-Fatal Errors:</strong> Single non-fatal error = 10% score reduction, Multiple non-fatal errors = 20% score reduction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricCardHeader}>
            <div className={`${styles.metricCardIcon} ${styles.blueIcon}`}>
              <BarChart3 size={20} className={`${styles.metricCardIconSvg} ${styles.blueIcon}`} />
            </div>
          </div>
          <h3 className={styles.metricCardTitle}>Overall Score</h3>
          <p className={`${styles.metricCardValue} ${styles.blueValue}`}>87.2%</p>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricCardHeader}>
            <div className={`${styles.metricCardIcon} ${styles.greenIcon}`}>
              <Phone size={20} className={`${styles.metricCardIconSvg} ${styles.greenIcon}`} />
            </div>
          </div>
          <h3 className={styles.metricCardTitle}>Total Calls</h3>
          <p className={`${styles.metricCardValue} ${styles.greenValue}`}>212</p>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricCardHeader}>
            <div className={`${styles.metricCardIcon} ${styles.redIcon}`}>
              <AlertTriangle size={20} className={`${styles.metricCardIconSvg} ${styles.redIcon}`} />
            </div>
          </div>
          <h3 className={styles.metricCardTitle}>Fatal Errors</h3>
          <p className={`${styles.metricCardValue} ${styles.redValue}`}>3</p>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricCardHeader}>
            <div className={`${styles.metricCardIcon} ${styles.blueIcon}`}>
              <Clock size={20} className={`${styles.metricCardIconSvg} ${styles.blueIcon}`} />
            </div>
          </div>
          <h3 className={styles.metricCardTitle}>Avg Call Duration</h3>
          <p className={`${styles.metricCardValue} ${styles.blueValue}`}>8:45</p>
        </div>
      </div>

      {/* Call Quality Parameters Analysis */}
      <div className={styles.analysisCard}>
        <h3 className={styles.analysisTitle}>Call Quality Parameters Analysis</h3>
        
        <div className={styles.analysisTable}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Parameter</th>
                <th className={styles.tableHeaderCell}>Max Score</th>
                <th className={styles.tableHeaderCell}>Type</th>
                <th className={styles.tableHeaderCell}>Current Score</th>
                <th className={styles.tableHeaderCell}>Adherence %</th>
                <th className={styles.tableHeaderCell}>Trend</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              <tr className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div>
                    <p className={styles.parameterName}>Call Opening / Adherence to Opening Script</p>
                    <p className={styles.parameterDescription}>Greet employer, introduce with name, mention WorkIndia, state feedback call purpose</p>
                  </div>
                </td>
                <td className={`${styles.tableCell} ${styles.parameterScore}`}>5</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.parameterBadge} ${styles.nonFatal}`}>
                    Non-Fatal
                  </span>
                </td>
                <td className={`${styles.tableCell} ${styles.parameterCurrentScore}`}>4.2</td>
                <td className={styles.tableCell}>
                  <div className={styles.adherenceContainer}>
                    <div className={styles.adherenceBar}>
                      <div className={`${styles.adherenceFill} ${styles.orange}`} style={{ width: '84%' }}></div>
                    </div>
                    <span className={styles.adherenceText}>84%</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <TrendingDown className={`${styles.trendIcon} ${styles.down}`} />
                </td>
              </tr>

              <tr className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div>
                    <p className={styles.parameterName}>Effective Questioning and Probing</p>
                    <p className={styles.parameterDescription}>Agent must ask all 5 mandatory questions clearly and appropriately</p>
                  </div>
                </td>
                <td className={`${styles.tableCell} ${styles.parameterScore}`}>35</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.parameterBadge} ${styles.fatal}`}>
                    Fatal
                  </span>
                </td>
                <td className={`${styles.tableCell} ${styles.parameterCurrentScore}`}>28.5</td>
                <td className={styles.tableCell}>
                  <div className={styles.adherenceContainer}>
                    <div className={styles.adherenceBar}>
                      <div className={`${styles.adherenceFill} ${styles.orange}`} style={{ width: '81%' }}></div>
                    </div>
                    <span className={styles.adherenceText}>81%</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <TrendingDown className={`${styles.trendIcon} ${styles.down}`} />
                </td>
              </tr>

              <tr>
                <td className={styles.tableCell}>
                  <div>
                    <p className={styles.parameterName}>Interruptions (if any)</p>
                    <p className={styles.parameterDescription}>Agent should not interrupt employer unless absolutely necessary</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">5</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.parameterBadge} ${styles.nonFatal}`}>
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">4.8</td>
                <td className={styles.tableCell}>
                  <div className={styles.adherenceContainer}>
                    <div className={styles.adherenceBar}>
                      <div className={`${styles.adherenceFill} ${styles.green}`} style={{ width: '96%' }}></div>
                    </div>
                    <span className={styles.adherenceText}>96%</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <TrendingUp className={`${styles.trendIcon} ${styles.up}`} />
                </td>
              </tr>

              <tr>
                <td className={styles.tableCell}>
                  <div>
                    <p className={styles.parameterName}>Unnecessary or Off-topic Conversation</p>
                    <p className={styles.parameterDescription}>Avoid irrelevant, personal, or casual talk not related to feedback objective</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">5</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.parameterBadge} ${styles.nonFatal}`}>
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">4.6</td>
                <td className={styles.tableCell}>
                  <div className={styles.adherenceContainer}>
                    <div className={styles.adherenceBar}>
                      <div className={`${styles.adherenceFill} ${styles.green}`} style={{ width: '92%' }}></div>
                    </div>
                    <span className={styles.adherenceText}>92%</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <TrendingUp className={`${styles.trendIcon} ${styles.up}`} />
                </td>
              </tr>

              <tr>
                <td className={styles.tableCell}>
                  <div>
                    <p className={styles.parameterName}>Incomplete Notes</p>
                    <p className={styles.parameterDescription}>Fails to capture, records incorrectly, or leaves field blank</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">20</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.parameterBadge} ${styles.fatal}`}>
                    Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">18.2</td>
                <td className={styles.tableCell}>
                  <div className={styles.adherenceContainer}>
                    <div className={styles.adherenceBar}>
                      <div className={`${styles.adherenceFill} ${styles.green}`} style={{ width: '91%' }}></div>
                    </div>
                    <span className={styles.adherenceText}>91%</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <TrendingUp className={`${styles.trendIcon} ${styles.up}`} />
                </td>
              </tr>

              <tr>
                <td className={styles.tableCell}>
                  <div>
                    <p className={styles.parameterName}>Correct Disposition Selection</p>
                    <p className={styles.parameterDescription}>Final disposition must match employer's actual response</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">10</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.parameterBadge} ${styles.fatal}`}>
                    Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">9.1</td>
                <td className={styles.tableCell}>
                  <div className={styles.adherenceContainer}>
                    <div className={styles.adherenceBar}>
                      <div className={`${styles.adherenceFill} ${styles.green}`} style={{ width: '91%' }}></div>
                    </div>
                    <span className={styles.adherenceText}>91%</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <TrendingUp className={`${styles.trendIcon} ${styles.up}`} />
                </td>
              </tr>

              <tr>
                <td className={styles.tableCell}>
                  <div>
                    <p className={styles.parameterName}>Proper Call Flow / Sequence Followed</p>
                    <p className={styles.parameterDescription}>Introduction → Feedback Questions → Call Closing</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">10</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.parameterBadge} ${styles.nonFatal}`}>
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">9.3</td>
                <td className={styles.tableCell}>
                  <div className={styles.adherenceContainer}>
                    <div className={styles.adherenceBar}>
                      <div className={`${styles.adherenceFill} ${styles.green}`} style={{ width: '93%' }}></div>
                    </div>
                    <span className={styles.adherenceText}>93%</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <TrendingUp className={`${styles.trendIcon} ${styles.up}`} />
                </td>
              </tr>

              <tr>
                <td className={styles.tableCell}>
                  <div>
                    <p className={styles.parameterName}>No False or Misleading Promises Made</p>
                    <p className={styles.parameterDescription}>Avoid misleading or over-promising statements</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">5</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.parameterBadge} ${styles.nonFatal}`}>
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">4.9</td>
                <td className={styles.tableCell}>
                  <div className={styles.adherenceContainer}>
                    <div className={styles.adherenceBar}>
                      <div className={`${styles.adherenceFill} ${styles.green}`} style={{ width: '98%' }}></div>
                    </div>
                    <span className={styles.adherenceText}>98%</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <TrendingUp className={`${styles.trendIcon} ${styles.up}`} />
                </td>
              </tr>

              <tr>
                <td className={styles.tableCell}>
                  <div>
                    <p className={styles.parameterName}>Proper Call Disconnection / Call Closing</p>
                    <p className={styles.parameterDescription}>Agent must politely thank employer and clearly close the call</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">5</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.parameterBadge} ${styles.nonFatal}`}>
                    Non-Fatal
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-900">4.7</td>
                <td className={styles.tableCell}>
                  <div className={styles.adherenceContainer}>
                    <div className={styles.adherenceBar}>
                      <div className={`${styles.adherenceFill} ${styles.green}`} style={{ width: '94%' }}></div>
                    </div>
                    <span className={styles.adherenceText}>94%</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <TrendingUp className={`${styles.trendIcon} ${styles.up}`} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent Performance Summary */}
      <div className={styles.summaryCard}>
        <h3 className={styles.summaryTitle}>Agent Performance Summary</h3>
        
        <div className={styles.analysisTable}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Agent Name</th>
                <th className={styles.tableHeaderCell}>Total Score</th>
                <th className={styles.tableHeaderCell}>Fatal Errors</th>
                <th className={styles.tableHeaderCell}>Non-Fatal Errors</th>
                <th className={styles.tableHeaderCell}>Total Calls</th>
                <th className={styles.tableHeaderCell}>Status</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              <tr>
                <td className={styles.tableCell}>
                  <div className={styles.agentCell}>
                    <div className={styles.agentAvatar}>
                      <User size={16} className={styles.agentAvatarIcon} />
                    </div>
                    <span className={styles.parameterName}>Priya Sharma</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={`${styles.agentScore} ${styles.orange}`}>87.2%</span>
                </td>
                <td className="py-4 px-4 text-gray-700">0</td>
                <td className="py-4 px-4 text-gray-700">2</td>
                <td className="py-4 px-4 text-gray-700">45</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.agentStatus} ${styles.excellent}`}>
                    Excellent
                  </span>
                </td>
              </tr>

              <tr>
                <td className={styles.tableCell}>
                  <div className={styles.agentCell}>
                    <div className={styles.agentAvatar}>
                      <User size={16} className={styles.agentAvatarIcon} />
                    </div>
                    <span className={styles.parameterName}>Arjun Patel</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={`${styles.agentScore} ${styles.orange}`}>82.1%</span>
                </td>
                <td className="py-4 px-4 text-gray-700">1</td>
                <td className="py-4 px-4 text-gray-700">3</td>
                <td className="py-4 px-4 text-gray-700">38</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.agentStatus} ${styles.good}`}>
                    Good
                  </span>
                </td>
              </tr>

              <tr>
                <td className={styles.tableCell}>
                  <div className={styles.agentCell}>
                    <div className={styles.agentAvatar}>
                      <User size={16} className={styles.agentAvatarIcon} />
                    </div>
                    <span className={styles.parameterName}>Kavya Reddy</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={`${styles.agentScore} ${styles.green}`}>94.5%</span>
                </td>
                <td className="py-4 px-4 text-gray-700">0</td>
                <td className="py-4 px-4 text-gray-700">1</td>
                <td className="py-4 px-4 text-gray-700">52</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.agentStatus} ${styles.excellent}`}>
                    Excellent
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}