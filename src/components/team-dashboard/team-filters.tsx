'use client';

import { useState } from 'react';
import styles from './team-filters.module.scss';

interface FilterState {
  team: string;
  campaign: string;
  dateRange: string;
}

export function TeamFilters() {
  const [filters, setFilters] = useState<FilterState>({
    team: 'all',
    campaign: 'all',
    dateRange: 'last-30-days',
  });

  const teams = [
    { value: 'all', label: 'All Teams' },
    { value: 'customer-support', label: 'Customer Support' },
    { value: 'sales', label: 'Sales Team' },
    { value: 'technical-support', label: 'Technical Support' },
  ];

  const campaigns = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'holiday-sale', label: 'Holiday Sale Campaign' },
    { value: 'product-launch', label: 'Product Launch' },
    { value: 'customer-retention', label: 'Customer Retention' },
    { value: 'upselling', label: 'Upselling Campaign' },
  ];

  const dateRanges = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      team: 'all',
      campaign: 'all',
      dateRange: 'last-30-days',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <button onClick={handleResetFilters} className={styles.resetButton}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
          Reset Filters
        </button>
      </div>

      <div className={styles.filtersGrid}>
        {/* Team Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Team</label>
          <select
            value={filters.team}
            onChange={(e) => handleFilterChange('team', e.target.value)}
            className={styles.filterSelect}
          >
            {teams.map((team) => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </select>
        </div>

        {/* Campaign Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Campaign</label>
          <select
            value={filters.campaign}
            onChange={(e) => handleFilterChange('campaign', e.target.value)}
            className={styles.filterSelect}
          >
            {campaigns.map((campaign) => (
              <option key={campaign.value} value={campaign.value}>
                {campaign.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className={styles.filterSelect}
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Date Range (shown when custom is selected) */}
        {filters.dateRange === 'custom' && (
          <div className={styles.customDateRange}>
            <div className={styles.dateInputGroup}>
              <label className={styles.dateLabel}>From</label>
              <input
                type="date"
                className={styles.dateInput}
                defaultValue="2024-01-01"
              />
            </div>
            <div className={styles.dateInputGroup}>
              <label className={styles.dateLabel}>To</label>
              <input
                type="date"
                className={styles.dateInput}
                defaultValue="2024-01-31"
              />
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      <div className={styles.activeFilters}>
        <span className={styles.activeFiltersLabel}>Active Filters:</span>
        <div className={styles.filterTags}>
          {filters.team !== 'all' && (
            <span className={styles.filterTag}>
              Team: {teams.find((t) => t.value === filters.team)?.label}
              <button
                onClick={() => handleFilterChange('team', 'all')}
                className={styles.removeFilter}
              >
                ×
              </button>
            </span>
          )}
          {filters.campaign !== 'all' && (
            <span className={styles.filterTag}>
              Campaign:{' '}
              {campaigns.find((c) => c.value === filters.campaign)?.label}
              <button
                onClick={() => handleFilterChange('campaign', 'all')}
                className={styles.removeFilter}
              >
                ×
              </button>
            </span>
          )}
          {filters.dateRange !== 'last-30-days' && (
            <span className={styles.filterTag}>
              Date:{' '}
              {dateRanges.find((d) => d.value === filters.dateRange)?.label}
              <button
                onClick={() => handleFilterChange('dateRange', 'last-30-days')}
                className={styles.removeFilter}
              >
                ×
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
