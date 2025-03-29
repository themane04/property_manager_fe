import {useToast,} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {initialFeature} from "../utils/initialStateUtil.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toastUtil.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {Feature} from "../interfaces/featuresInterfaces.ts";
import DynamicForm from "../components/forms/DynamicForm.tsx";
import FeaturesList from "../components/lists/FeaturesList.tsx";

const FeaturesPage = () => {
    const [features, setFeatures] = useState<Feature[]>([])
    const [form, setForm] = useState(initialFeature)
    const [editId, setEditId] = useState<string | null>(null)
    const toast = useToast()

    const fetchFeatures = () => {
        axios.get('http://localhost:8000/api/features').then((res) => {
            setFeatures(res.data)
        })
    }

    useEffect(() => {
        fetchFeatures()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        const action = editId
            ? axios.patch(`http://localhost:8000/api/features/${editId}`, form)
            : axios.post('http://localhost:8000/api/features', form)

        action
            .then(() => {
                showSuccessToast(toast, editId ? 'Feature successfully updated' : 'Feature successfully created')
                setForm(initialFeature)
                setEditId(null)
                fetchFeatures()
            })
            .catch((err) => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8000/api/features/${id}`).then(() => {
            fetchFeatures()
            showInfoToast(toast, 'Feature successfully deleted')
        })
    }

    const handleEdit = (feature: Feature) => {
        setForm({name: feature.name})
        setEditId(feature.id)
    }

    return (
        <>
            <PageLayout title="⚙️ Features">
                <InnerPageLayout>
                    <DynamicForm
                        data={form}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        editId={editId}
                    />
                </InnerPageLayout>

                <FeaturesList
                    title={"📋 List of Tenants"}
                    features={features}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default FeaturesPage
