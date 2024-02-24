"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';
import { addRef, resetDefault } from '@/app/state-management/slices/ref-member';

export default function AddRef() {
    const { isRefAdded, isRefNotAdded, refValue } = useSelector(state => state.refMember);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(resetDefault())
        }, 5000)
    }, [isRefAdded, isRefNotAdded])

    const validMemberCode = (value) => {
        let error;
        if (!value) error = "هذا الحقل مطلوب"
        return error;
    }

    const validMemberName = (value) => {
        let error;
        if (!value) error = "هذا الحقل مطلوب"
        return error;
    }

    const validateRef = (value) => {
        let error;
        if (!value) error = "هذا الحقل مطلوب"
        return error;
    }

    const validateSex = (value) => {
        let error;
        if (!value) error = "هذا الحقل مطلوب"
        return error;
    }

    const validSerialNo = (value) => {
        let error;
        if (!value) error = "هذا الحقل مطلوب"
        return error;
    }

    return <>
        <div>
            <Container>
                <Row>
                    <Col>
                        {isRefAdded && (<div>
                            <div className="w-50 mx-auto mt-5" role="alert">
                                <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                                    نجاح
                                </div>
                                <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                                    <p>تم إضافة العضو بنجاح</p>
                                </div>
                            </div>
                        </div>)}
                        {isRefNotAdded && (<div>
                            <div className="w-50 mx-auto mt-5" role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    فشل
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <p>هذا العضو موجود بالفعل.</p>
                                </div>
                            </div>
                        </div>)}
                    </Col>
                </Row>
            </Container>
            <Formik
                initialValues={refValue}
                onSubmit={(ref, {resetForm}) => {
                    console.log(ref)
                    dispatch(addRef(ref))
                    resetForm({
                        member_code: '',
                        name: '',
                        ref: undefined,
                        sex: undefined,
                        serial_no: '',
                    })
                }}
            >
                {({ errors, touched, values }) => (
                    <Form className="d-flex flex-column justify-content-center align-items-center mt-5 rounded py-2 w-50 border mx-auto">
                        <div className="grid gap-2 mb-6 md:grid-cols-1 w-75">

                            <label htmlFor="member_code" className="block mt-2 text-xl font-bold text-gray-500 dark:text-white">رقم العضوية
                                <span className="text-danger"> * </span>
                            </label>
                            <Field
                                type="text" name="member_code" id="member_code"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="رقم العضوية"
                                validate={validMemberCode}
                                validateOnChange={true}
                                value={values.member_code} />
                            {errors.member_code && touched.member_code && (
                                <div className={`warning mb-2 text-danger fw-semibold w-100 `}>
                                    {errors.member_code}
                                </div>
                            )}

                            <label htmlFor="name" className="block mt-2 text-xl font-bold text-gray-500 dark:text-white">الأسم
                                <span className="text-danger"> * </span>
                            </label>
                            <Field
                                type="text" name="name" id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="الاسم"
                                validate={validMemberName}
                                validateOnChange={true}
                                value={values.name} />
                            {errors.name && touched.name && (
                                <div className={`warning mb-2 text-danger fw-semibold w-100 `}>
                                    {errors.name}
                                </div>
                            )}

                            <label htmlFor="ref" className="block mt-2 text-xl font-bold text-gray-500 dark:text-white">صلة القرابة
                                <span className="text-danger"> * </span>
                            </label>
                            <Field
                                as="select" name="ref" id="ref" type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                validate={validateRef}
                                value={values.ref}>
                                <option value="">---</option>
                                <option value={1}>والد</option>
                                <option value={2}>والدة</option>
                                <option value={3}>زوجة</option>
                                <option value={4}>زوج</option>
                                <option value={5}>ابن</option>
                                <option value={7}>ابنة</option>
                            </Field>
                            {errors.ref && touched.ref && (
                                <div className={`warning mb-2 text-danger fw-semibold w-100 `}>
                                    {errors.ref}
                                </div>
                            )}

                            <label htmlFor="sex" className="block mt-2 text-xl font-bold text-gray-500 dark:text-white">النوع
                                <span className="text-danger"> * </span>
                            </label>
                            <Field
                                as="select" name="sex" id="sex" type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                validate={validateSex}
                                value={values.sex}>
                                <option value="">---</option>
                                <option value={1}>ذكر</option>
                                <option value={2}>أنثي</option>
                            </Field>
                            {errors.sex && touched.sex && (
                                <div className={`warning mb-2 text-danger fw-semibold w-100 `}>
                                    {errors.sex}
                                </div>
                            )}

                            <label htmlFor="serial_no" className="block mt-2 text-xl font-bold text-gray-500 dark:text-white">الرقم التسلسلي
                                <span className="text-danger"> * </span>
                            </label>
                            <Field
                                type="text" name="serial_no" id="serial_no"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="الرقم التسلسي"
                                validate={validSerialNo}
                                validateOnChange={true}
                                value={values.serial_no} />
                            {errors.serial_no && touched.serial_no && (
                                <div className={`warning mb-2 text-danger fw-semibold w-100 `}>
                                    {errors.serial_no}
                                </div>
                            )}

                        </div>
                        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full w-50">اضافة العضو</button>
                    </Form>
                )}
            </Formik>
        </div>
    </>
}
