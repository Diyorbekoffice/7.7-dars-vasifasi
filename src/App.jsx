import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser, editUser } from './store/counterReducer';
import { setLanguage } from './store/languageReducer';
import { setTheme } from './store/themeReducer';

function App() {
  const users = useSelector((state) => state.usersData.users);
  const language = useSelector((state) => state.languageData.language);
  const theme = useSelector((state) => state.themeData.theme);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, username: '', email: '', age: '' });

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const ageRef = useRef(null);

  const handleAddUser = () => {
    setCurrentUser({ id: Date.now(), username: '', email: '', age: '' });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setEditMode(true);
    setShowModal(true);
  };

  const handleSaveUser = () => {
    const { username, email, age } = currentUser;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const alertMessages = {
      en: {
        incomplete: "Please fill out all fields",
        invalidEmail: "Invalid email format",
      },
      ru: {
        incomplete: "Пожалуйста, заполните все поля",
        invalidEmail: "Неверный формат электронной почты",
      },
    };

    const messages = alertMessages[language];

    if (!username) {
      alert(messages.incomplete);
      usernameRef.current.focus();
      return;
    }
    if (!email || !emailRegex.test(email)) {
      alert(messages.invalidEmail);
      emailRef.current.focus();
      return;
    }
    if (!age) {
      alert(messages.incomplete);
      ageRef.current.focus();
      return;
    }

    if (editMode) {
      dispatch(editUser(currentUser));
    } else {
      dispatch(addUser(currentUser));
    }
    setShowModal(false);
  };

  const themeClasses = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';

  return (
    <div className={`app flex flex-col items-center p-4 ${themeClasses}`}>
      <h1 className="text-3xl font-bold mb-6">{language === 'en' ? 'User Management' : 'Управление пользователями'}</h1>


      <div className="mb-4 flex gap-4">
        <div>
          <label className="mr-2">{language === 'en' ? 'Select Language:' : 'Выберите язык:'}</label>
          <select
            value={language}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
            className={theme == 'dark' ? 'border border-gray-300 text-black rounded p-1' : 'border border-gray-300 rounded p-1'} 
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>
        <div>
          <label className="mr-2">{language === 'en' ? 'Theme:' : 'Тема:'}</label>
          <select
            value={theme}
            onChange={(e) => dispatch(setTheme(e.target.value))}
            className={theme == 'dark' ? 'border border-gray-300 text-black rounded p-1' : 'border border-gray-300 rounded p-1'} 
          >
            <option value="light">{language === 'en' ? 'Light' : 'Светлый'}</option>
            <option value="dark">{language === 'en' ? 'Dark' : 'Темный'}</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleAddUser}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {language === 'en' ? 'Add User' : 'Добавить пользователя'}
      </button>

      <div className="user-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="user-card p-4 border border-gray-300 rounded shadow-md">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p>{language === 'en' ? 'Email' : 'Электронная почта'}: {user.email}</p>
            <p>{language === 'en' ? 'Age' : 'Возраст'}: {user.age}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEditUser(user)}
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                {language === 'en' ? 'Edit' : 'Редактировать'}
              </button>
              <button
                onClick={() => dispatch(removeUser(user.id))}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {language === 'en' ? 'Delete' : 'Удалить'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="modal bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-2xl font-bold mb-4">
              {editMode ? (language === 'en' ? 'Edit User' : 'Редактировать пользователя') : (language === 'en' ? 'Add User' : 'Добавить пользователя')}
            </h2>
            <input
              type="text"
              placeholder={language === 'en' ? 'Username' : 'Имя пользователя'}
              value={currentUser.username}
              onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
              ref={usernameRef}
              className={theme == 'dark' ? 'w-full mb-2 p-2 border border-gray-300 rounded text-zinc-900' : 'w-full mb-2 p-2 border border-gray-300 rounded' }
            />
            <input
              type="email"
              placeholder="Email"
              value={currentUser.email}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              ref={emailRef}
              className={theme == 'dark' ? 'w-full mb-2 p-2 border border-gray-300 rounded text-zinc-900' : 'w-full mb-2 p-2 border border-gray-300 rounded' }
            />
            <input
              type="number"
              placeholder={language === 'en' ? 'Age' : 'Возраст'}
              value={currentUser.age}
              onChange={(e) => setCurrentUser({ ...currentUser, age: e.target.value })}
              ref={ageRef}
              className={theme == 'dark' ? 'w-full mb-2 p-2 border border-gray-300 rounded text-zinc-900' : 'w-full mb-2 p-2 border border-gray-300 rounded' }
            />
            <button
              onClick={handleSaveUser}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {language === 'en' ? 'Save' : 'Сохранить'}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {language === 'en' ? 'Cancel' : 'Отмена'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
