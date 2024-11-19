import { useCurrentUser } from '@/features/auth/api/use-current-user';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { barangays } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { api } from '../../../../convex/_generated/api';
import { Button } from '@/components/ui/button';

export function AccountSettingsModal() {
    const { data, isLoading } = useCurrentUser();
    const updateUser = useMutation(api.users.updateUser);
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        address: '',
        barangay: '',
        municipality: '',
        province: 'Batangas'
    });

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name || '',
                lastName: data.lastName || '',
                email: data.email || '',
                address: data.address || '',
                barangay: data.barangay || '',
                municipality: data.municipality || '',
                province: data.province || 'Batangas'
            });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    if (isLoading) return <div>Loading...</div>;

    if (!data) return <div>No user data available</div>;

    const handleSave = async () => {
        console.log(formData)
        toast.promise(updateUser({
            name: formData.name,
            lastName: formData.lastName,
            address: formData.address,
            barangay: formData.barangay,
            municipality: formData.municipality,
            province: formData.province,
        }), {
            success: "Account settings updated successfully",
            error: "Failed to update account settings",
            loading: "Updating account settings..."
        })
        setIsEditable(!isEditable)
    }

    return (
        <Dialog>
            <DialogTrigger className=" hover:text-primary-dark transition-colors">Account Settings</DialogTrigger>
            <DialogContent className="p-6  max-w-5xl bg-white rounded-lg shadow-lg overflow-y-auto">
                <DialogTitle className="text-lg font-semibold text-gray-900 mb-4">Account Settings</DialogTitle>
               
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-800">First Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            readOnly={!isEditable}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-800">Last Name</Label>
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            readOnly={!isEditable}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-800">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                        readOnly
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-800">Street Address</Label>
                    <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        readOnly={!isEditable}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-800">Municipality</Label>
                        <Select
                            name="municipality"
                            value={formData.municipality}
                            onValueChange={(value) => setFormData(prevState => ({ ...prevState, municipality: value }))}
                            disabled={!isEditable}
                        >
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select a municipality" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from(new Set(barangays.map(barangay => barangay.municipality))).map(municipality => (
                                    <SelectItem key={municipality} value={municipality}>
                                        {municipality}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-800">Barangay</Label>
                        <Select
                            name="barangay"
                            value={formData.barangay}
                            onValueChange={(value) => setFormData(prevState => ({ ...prevState, barangay: value }))}
                            disabled={!isEditable || !formData.municipality}
                        >
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select a barangay" />
                            </SelectTrigger>
                            <SelectContent>
                                {barangays
                                    .filter(barangay => barangay.municipality === formData.municipality)
                                    .map(barangay => (
                                        <SelectItem key={barangay.barangay} value={barangay.barangay}>
                                            {barangay.barangay}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-800">Province</Label>
                    <Input
                        type="text"
                        name="province"
                        value="Batangas"
                        disabled
                        readOnly
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>
                {isEditable && (
                    <Button 
                        onClick={() => {handleSave()}} 
                    className={`mb-4 px-4 py-2 rounded-md transition-colors ${isEditable ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                    {isEditable ? 'Save' : 'Edit'}
                </Button>
                )}
                {!isEditable && (
                    <Button 
                        onClick={() => {setIsEditable(!isEditable)}} 
                    className={`mb-4 px-4 py-2 rounded-md transition-colors ${isEditable ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                    Edit
                </Button>
                )}
            </DialogContent>
           
        </Dialog>
    );
}
