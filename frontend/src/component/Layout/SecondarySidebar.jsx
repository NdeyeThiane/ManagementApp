import React from 'react';

const SecondarySidebar = () => {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4">Secondary Navigation</h3>
      <ul>
        <li><a href="/courses/1/modules">Modules</a></li>
        <li><a href="/courses/1/assignments">Assignments</a></li>
        <li><a href="/courses/1/discussions">Discussions</a></li>
      </ul>
    </div>
  );
};

export default SecondarySidebar;



{/* <Route path="/courses/:id" element={<DetailpagesLayout />}>
<Route path="courses/:id" element={<CourseDetail />} />
<Route path="courses/:id/edit" element={<CourseForm />} />
<Route path="courses/:id/modules" element={<ModuleList />} />
<Route path="courses/:id/modules/new" element={<ModuleForm />} />
<Route path="courses/:id/modules/:moduleId" element={<ModuleDetail />} />
<Route path="courses/:id/modules/:moduleId/edit" element={<ModuleForm />} />
<Route path="courses/:id/modules/:moduleId/assignments" element={<AssignmentList />} />
<Route path="courses/:id/modules/:moduleId/assignments/new" element={<AssignmentForm />} />
<Route path="courses/:id/modules/:moduleId/assignments/:assignmentId" element={<AssignmentDetail />} />
<Route path="courses/:id/modules/:moduleId/assignments/:assignmentId/edit" element={<AssignmentForm />} /> */}