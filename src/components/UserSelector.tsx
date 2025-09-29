import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import styles from './UserSelector.module.scss';

interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface UserSelectorProps {
  users: User[];
  selectedUser: User;
  onUserSelect: (user: User) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function UserSelector({ users, selectedUser, onUserSelect, isOpen, onToggle }: UserSelectorProps) {
  return (
    <div className={styles.userSelector}>
      <button
        onClick={onToggle}
        className={styles.selectorButton}
      >
        <div className={styles.selectorAvatar}>
          <User className={styles.selectorIcon} />
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userRole}>{selectedUser.role}</p>
        </div>
        <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.userList}>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => onUserSelect(user)}
                className={`${styles.userOption} ${
                  selectedUser.id === user.id ? styles.active : styles.inactive
                }`}
              >
                <div className={styles.optionAvatar}>
                  <User className={styles.optionIcon} />
                </div>
                <div className={styles.optionInfo}>
                  <p className={styles.optionRole}>{user.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}