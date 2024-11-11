import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addModule, updateModule, fetchModuleById, clearSelectedModule } from '../../app/features/modules/modulesSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ModuleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseid, moduleid } = useParams(); 
  const isEditMode = !!moduleid;
  const selectedModule = useSelector((state) => state.modules.selectedModule);
  const [modulename, setModulename] = useState('');

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchModuleById(moduleid));
    } else {
      dispatch(clearSelectedModule());
    }
  }, [dispatch, isEditMode, moduleid]);

  useEffect(() => {
    if (isEditMode && selectedModule) {
      setModulename(selectedModule.modulename);
    }
  }, [isEditMode, selectedModule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateModule({ moduleid, modulename }));
    } else {
      dispatch(addModule({ courseid, modulename }));
    }
    navigate(`/courses/${courseid}/modules`);
  };

  return (
    <div>
      <h1>{isEditMode ? 'Edit Module' : 'Add Module'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Module Name:
          <input
            type="text"
            value={modulename}
            onChange={(e) => setModulename(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update Module' : 'Create Module'}
        </button>
      </form>
    </div>
  );
};

export default ModuleForm;
