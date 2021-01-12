import { useFormik } from 'formik';
import React from 'react';
import styles from './EditIssue.module.css';
import { createIssue, getIssueById, updateIssue} from '../services/apiService';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { setToken } from '../services/api';


const EditCreateIssue = () => {
    let history = useHistory();
    let locationObject = useLocation();
    setToken(localStorage.getItem('jwtToken'));
    const { id } = useParams();
    const isEdit = locationObject.pathname.split('/').includes('edit');
    const [issueObject, setIssueObject] = React.useState({
        title: '',
        responsible: '',
        severity: '',
        status: '',
        description: '',
    })
    const validate = values => {
        const errors = {};
        if (!values.title) {
            errors.title = 'Title is required'
        }
        if (!values.responsible) {
            errors.responsible = 'Asignee is required'
        }
        if (!values.severity) {
            errors.severity = 'Severity is required'
        }
        if (!values.status) {
            errors.status = 'Status is required'
        }
        if (!values.description) {
            errors.description = 'Status is required'
        }

        return errors;
    };

    const onSubmit = () => {
        if(!isEdit) {
            createIssue(formik.values).then(response => {
                history.push('/home/list');
            })
            .catch(error => {
                window.alert('Error creating the issue')
            });
        } else {
            updateIssue(formik.values, id).then(response => {
                history.push('/home/list');
            })
            .catch(error => {
                window.alert('Error creating the issue')
            });
        }
        
    }

    let formik = useFormik({
        initialValues: issueObject,
        validate,
        onSubmit,
        enableReinitialize: true,
    });

    const fetchIssue = async () => {
        const response = await getIssueById(id);
        setIssueObject(response.data);
    }

    React.useEffect(() => {
        fetchIssue();
    }, [])

    
    


    return (
        <div className={styles['create-contaner']}>
            <div className={styles['form-wrapper']}>
                <h2>{!isEdit ? 'Create a Issue' : 'Edit the issue'}</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles['form-group']}>
                        <label htmlFor="title">
                            Title
                        </label>
                        <input type="text" id="title" className={(formik.touched.title && !formik.errors.title) ? styles['form-control'] + ' ' + styles['valid'] : styles['form-control']}
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            onBlur={formik.handleBlur} />
                        {
                            (formik.touched.title && formik.errors.title) ? <span className={styles['error-message']}>{formik.errors.title}</span> : ''
                        }
                    </div>

                    <div className={styles['form-group']}>
                        <label htmlFor="responsible">
                            Assignee
                        </label>
                        <input type="text" id="responsible"
                            className={(formik.touched.responsible && !formik.errors.responsible) ? styles['form-control'] + ' ' + styles['valid'] : styles['form-control']}
                            onChange={formik.handleChange}
                            value={formik.values.responsible}
                            onBlur={formik.handleBlur} />
                        {
                            (formik.touched.responsible && formik.errors.responsible) ? <span className={styles['error-message']}>{formik.errors.responsible}</span> : ''
                        }
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="severity">
                            Severity
                        </label>
                        <select name="severity" id="severity"
                            className={(formik.touched.severity && !formik.errors.severity) ? styles['form-control'] + ' ' + styles['valid'] : styles['form-control']}
                            onChange={formik.handleChange}
                            value={formik.values.severity}
                            onBlur={formik.handleBlur}>
                            <option value="" hidden>Select</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                        {
                            (formik.touched.severity && formik.errors.severity) ? <span className={styles['error-message']}>{formik.errors.severity}</span> : ''
                        }
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="status">
                            Status
                        </label>
                        <select name="status" id="status" 
                            className={(formik.touched.status && !formik.errors.status) ? styles['form-control'] + ' ' + styles['valid'] : styles['form-control']}
                            onChange={formik.handleChange}
                            value={formik.values.status}
                            onBlur={formik.handleBlur}>
                            <option value="" hidden>Select</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                        {
                            (formik.touched.status && formik.errors.status) ? <span className={styles['error-message']}>{formik.errors.status}</span> : ''
                        }
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="description">
                            Ticket descriptionription
                        </label>
                        <textarea name="description" id="description" cols="30" rows="10" 
                            className={(formik.touched.description && !formik.errors.description) ? styles['form-control'] + ' ' + styles['valid'] : styles['form-control']}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            onBlur={formik.handleBlur}></textarea>
                        {
                            (formik.touched.description && formik.errors.description) ? <span className={styles['error-message']}>{formik.errors.description}</span> : ''
                        }
                    </div>
                    <div className={styles['btn-container']}>
                        <button type="submit" className={styles['btn'] + ' ' + styles['submit-btn']}
                            disabled={!formik.isValid} >{isEdit ? 'update' : 'create'}</button>
                        <button type="button" className={styles['btn'] + ' ' + styles['reset-btn']} onClick={formik.resetForm}>reset</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditCreateIssue
