const fs = require('fs');
const path = require('path');

const fileName = 'student_notes.txt';
const filePath = path.join(__dirname, fileName);

console.log('1. Creating a new file...');

fs.writeFile(filePath, 'VIT-AP University\nNode.js File System Lab\n\nStudent Name: Prasanth\n', (err) => {
    if (err) {
        console.error('Error creating file:', err);
        return;
    }
    console.log(`✅ File "${fileName}" created successfully!`);

    console.log('\n2. Reading the file content...');
   
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('File Content:\n' + data);

        console.log('\n3. Appending new data to the file...');
       
        const newData = '\nReg. No: XXXXXXX\nBranch: B.Tech\nDate: ' + new Date().toLocaleDateString() +
                       '\nFaculty: Prof. S.Gopikrishnan\nSchool: SCOPE\n\n--- Lab Completed Successfully ---';

        fs.appendFile(filePath, newData, (err) => {
            if (err) {
                console.error('Error appending to file:', err);
                return;
            }
            console.log('✅ Data appended successfully!');

            console.log('\n4. Reading updated file content...');
           
            fs.readFile(filePath, 'utf8', (err, updatedData) => {
                if (err) {
                    console.error('Error reading updated file:', err);
                    return;
                }
                console.log('Updated File Content:\n' + updatedData);

                console.log('\n5. Deleting the file...');
               
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return;
                    }
                    console.log(`✅ File "${fileName}" deleted successfully!`);
                    console.log('\n🎉 All file operations completed successfully using asynchronous callbacks.');
                });
            });
        });
    });
});