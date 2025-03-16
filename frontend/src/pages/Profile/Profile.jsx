"use client"

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import jsPDF from "jspdf"
import autoTable from  "jspdf-autotable"
const UserProfile = () => {
  const { isVerified, user: currentUser } = useAuthStore()
  const transactionData = [
    { id: 1, stock: "AAPL", action: "bought", quantity: 5, price: "₹18,500", date: "2025-03-15", time: "10:30 AM" },
    { id: 2, stock: "MSFT", action: "sold", quantity: 3, price: "₹9,200", date: "2025-03-14", time: "2:15 PM" },
    { id: 3, stock: "GOOGL", action: "bought", quantity: 2, price: "₹26,400", date: "2025-03-13", time: "11:45 AM" },
    { id: 4, stock: "AMZN", action: "sold", quantity: 8, price: "₹14,800", date: "2025-03-12", time: "9:20 AM" },
    { id: 5, stock: "TSLA", action: "bought", quantity: 10, price: "₹21,300", date: "2025-03-11", time: "3:50 PM" },
    { id: 6, stock: "META", action: "bought", quantity: 7, price: "₹25,100", date: "2025-03-10", time: "11:20 AM" },
    { id: 7, stock: "NFLX", action: "sold", quantity: 4, price: "₹12,600", date: "2025-03-09", time: "1:35 PM" },
    { id: 8, stock: "NVDA", action: "bought", quantity: 3, price: "₹34,200", date: "2025-03-08", time: "10:15 AM" },
    { id: 9, stock: "AMD", action: "sold", quantity: 12, price: "₹8,400", date: "2025-03-07", time: "2:45 PM" },
    { id: 10, stock: "INTC", action: "bought", quantity: 15, price: "₹10,500", date: "2025-03-06", time: "9:50 AM" },
    { id: 11, stock: "IBM", action: "sold", quantity: 6, price: "₹16,800", date: "2025-03-05", time: "3:40 PM" },
    { id: 12, stock: "ORCL", action: "bought", quantity: 8, price: "₹13,600", date: "2025-03-04", time: "11:05 AM" },
    { id: 13, stock: "CRM", action: "sold", quantity: 5, price: "₹22,500", date: "2025-03-03", time: "1:25 PM" },
    { id: 14, stock: "ADBE", action: "bought", quantity: 2, price: "₹27,800", date: "2025-03-02", time: "10:10 AM" },
    { id: 15, stock: "PYPL", action: "sold", quantity: 9, price: "₹11,700", date: "2025-03-01", time: "2:30 PM" },
    { id: 16, stock: "AAPL", action: "sold", quantity: 7, price: "₹26,250", date: "2025-02-28", time: "10:00 AM" },
    { id: 17, stock: "GOOGL", action: "bought", quantity: 4, price: "₹52,800", date: "2025-02-27", time: "3:15 PM" },
    { id: 18, stock: "TSLA", action: "sold", quantity: 6, price: "₹12,780", date: "2025-02-26", time: "11:30 AM" },
    { id: 19, stock: "AMZN", action: "bought", quantity: 3, price: "₹5,550", date: "2025-02-25", time: "1:40 PM" },
    { id: 20, stock: "MSFT", action: "sold", quantity: 10, price: "₹30,667", date: "2025-02-24", time: "9:45 AM" },
  ]

  // This would typically come from your API/backend
  const [user, setUser] = useState({
    email: currentUser?.email,
    firstName: currentUser?.fullName.firstName,
    lastName: currentUser?.fullName.lastName,
    phone: "+91 1234567890",
    dateOfBirth: new Date("1988-04-12"),
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
    },
    profilePicture: "/default.jpg",
    kycStatus: currentUser?.kycStatus, // This will be updated dynamically
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
    },
    lastLoginAt: currentUser?.updatedAt?.split("T")[1],
    createdAt: currentUser?.updatedAt?.split("T")[1],
    updatedAt: currentUser?.updatedAt?.split("T")[1],
  })

  const [activeTab, setActiveTab] = useState("profile")

  // Update KYC status when isVerified changes
  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      kycStatus: isVerified ? "verified" : "not_submitted",
    }))
  }, [isVerified])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getKycStatusBadge = (status) => {
    const statusColors = {
      verified: "bg-emerald-900 text-emerald-200",
      pending: "bg-yellow-900 text-yellow-200",
      rejected: "bg-red-900 text-red-200",
      not_submitted: "bg-gray-800 text-gray-300",
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status.replace("_", " ")}
      </span>
    )
  }

  const getRoleBadge = (role) => {
    const roleColors = {
      admin: "bg-purple-900 text-purple-200",
      premium: "bg-blue-900 text-blue-200",
      user: "bg-gray-800 text-gray-300",
    }

    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role]}`}>{role}</span>
  }
  const handleReport = () => {
    // Create a new PDF document
    const doc = new jsPDF()

    // Add company logo/header
    doc.setFillColor(90, 49, 153) // Purple header
    doc.rect(0, 0, doc.internal.pageSize.width, 40, "F")

    // Add title
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.text("Transaction Report", 105, 20, { align: "center" })

    // Add date
    doc.setFontSize(10)
    doc.text(
      `Generated on: ${new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      105,
      30,
      { align: "center" },
    )

    // Add user info
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.text(`User: ${user.firstName} ${user.lastName}`, 14, 50)
    doc.text(`Email: ${user.email || "N/A"}`, 14, 58)

    // Format data for the table
    const tableData = transactionData.map((transaction) => [
      transaction.date + " " + transaction.time,
      transaction.stock,
      transaction.action.toUpperCase(),
      transaction.quantity,
      transaction.price,
    ])

    // Define table columns
    const tableColumns = [
      { header: "Date & Time", dataKey: "date" },
      { header: "Symbol", dataKey: "symbol" },
      { header: "Action", dataKey: "action" },
      { header: "Quantity", dataKey: "quantity" },
      { header: "Price", dataKey: "price" },
    ]

    // Add the table to the PDF
    ;autoTable(doc,{
      head: [tableColumns.map((col) => col.header)],
      body: tableData,
      startY: 65,
      theme: "grid",
      headStyles: {
        fillColor: [90, 49, 153],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 250],
      },
      columnStyles: {
        0: { cellWidth: 50 },
        2: {
          cellWidth: 30,
          fontStyle: "bold",
          halign: "center",
        },
        3: { halign: "center" },
        4: { halign: "right" },
      },
      didParseCell: (data) => {
        // Highlight buy/sell actions with colors
        if (data.section === "body" && data.column.index === 2) {
          if (data.cell.raw === "BOUGHT") {
            data.cell.styles.textColor = [0, 128, 0] // Green for buy
          } else if (data.cell.raw === "SOLD") {
            data.cell.styles.textColor = [220, 0, 0] // Red for sell
          }
        }
      },
    })

    // Add summary section
    const finalY = (doc).lastAutoTable.finalY + 10

    // Calculate totals
    const totalBought = transactionData.filter((t) => t.action === "bought").reduce((sum, t) => sum + t.quantity, 0)

    const totalSold = transactionData.filter((t) => t.action === "sold").reduce((sum, t) => sum + t.quantity, 0)

    // Add summary box
    doc.setDrawColor(90, 49, 153)
    doc.setLineWidth(0.5)
    doc.roundedRect(14, finalY, 180, 40, 3, 3)

    doc.setFontSize(14)
    doc.text("Transaction Summary", 105, finalY + 10, { align: "center" })

    doc.setFontSize(12)
    doc.text(`Total Transactions: ${transactionData.length}`, 20, finalY + 20)
    doc.text(`Total Bought: ${totalBought} shares`, 20, finalY + 28)
    doc.text(`Total Sold: ${totalSold} shares`, 20, finalY + 36)

    // Add footer
    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(10)
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setTextColor(150, 150, 150)
      doc.text(
        "This report is for informational purposes only. Please verify all transactions with your broker.",
        105,
        doc.internal.pageSize.height - 10,
        { align: "center" },
      )
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10)
    }

    // Save the PDF
    doc.save(`transaction_report_${user.firstName}_${user.lastName}.pdf`)
  }
  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="flex flex-row flex-1 justify-between items-center bg-gradient-to-r from-indigo-800 to-purple-900 px-6 py-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative">
                <img
                  src={user.profilePicture || "/placeholder.svg"}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-4 border-gray-700"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-indigo-300">{user.email}</p>
                <div className="flex mt-2 justify-center sm:justify-start">
                  {getKycStatusBadge(user.kycStatus)}
                  <p className="ml-4 text-sm text-indigo-300">Member since {formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
            <div>
              <Button type="submit" onClick={handleReport}>
                Track Your Report
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="border-b border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === "profile"
                    ? "border-b-2 border-purple-500 text-purple-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === "notifications"
                    ? "border-b-2 border-purple-500 text-purple-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Notification Settings
              </button>
              <button
                onClick={() => setActiveTab("account")}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === "account"
                    ? "border-b-2 border-purple-500 text-purple-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Account Info
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-6 sm:p-10">
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-100">Personal Information</h3>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-200">
                        {user.firstName} {user.lastName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Date of birth</dt>
                      <dd className="mt-1 text-sm text-gray-200">
                        {user.dateOfBirth ? formatDate(user.dateOfBirth) : "Not provided"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-200">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Phone number</dt>
                      <dd className="mt-1 text-sm text-gray-200">{user.phone || "Not provided"}</dd>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-100">Address</h3>
                  <div className="mt-4">
                    <div className="text-sm text-gray-200">
                      {user.address?.street && <p>{user.address.street}</p>}
                      {user.address?.city && user.address?.state && user.address?.zipCode && (
                        <p>
                          {user.address.city}, {user.address.state} {user.address.zipCode}
                        </p>
                      )}
                      {user.address?.country && <p>{user.address.country}</p>}
                      {!user.address?.street && !user.address?.city && (
                        <p className="text-gray-500">No address provided</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-100">KYC Status</h3>
                  <div className="mt-4">
                    <div className="flex items-center">
                      {getKycStatusBadge(user.kycStatus)}
                      {!isVerified && (
                        <Link to="/e-kyc">
                          <button className="ml-4 px-3 py-1.5 bg-purple-700 text-white text-xs font-medium rounded hover:bg-purple-600">
                            Verify KYC
                          </button>
                        </Link>
                      )}
                      {isVerified && (
                        <span className="ml-4 text-sm text-green-400">
                          Your identity has been verified successfully
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h3 className="text-lg font-medium text-gray-100">Notification Preferences</h3>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      checked={user.notificationPreferences.email}
                      className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="email-notifications" className="ml-3">
                      <span className="text-sm font-medium text-gray-200">Email notifications</span>
                      <p className="text-sm text-gray-400">Receive updates and alerts via email</p>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-notifications"
                      name="push-notifications"
                      type="checkbox"
                      checked={user.notificationPreferences.push}
                      className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="push-notifications" className="ml-3">
                      <span className="text-sm font-medium text-gray-200">Push notifications</span>
                      <p className="text-sm text-gray-400">Receive alerts on your device</p>
                    </label>
                  </div>
                </div>
                <div className="mt-8">
                  <button className="px-4 py-2 bg-purple-700 text-white text-sm font-medium rounded hover:bg-purple-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-100">Account Information</h3>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Account role</dt>
                      <dd className="mt-1 text-sm text-gray-200 flex items-center">
                        {getRoleBadge(user.role || "user")}
                        {user.role !== "premium" && (
                          <button className="ml-4 px-3 py-1 bg-purple-700 text-white text-xs font-medium rounded hover:bg-purple-600">
                            Upgrade
                          </button>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Member since</dt>
                      <dd className="mt-1 text-sm text-gray-200">{formatDate(user.createdAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Last login</dt>
                      <dd className="mt-1 text-sm text-gray-200">{formatDateTime(user.lastLoginAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400">Last updated</dt>
                      <dd className="mt-1 text-sm text-gray-200">{formatDate(user.updatedAt)}</dd>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6 flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-100">Password</h3>
                    <p className="mt-1 text-sm text-gray-400">Update your password regularly for security</p>
                    <button className="mt-4 px-4 py-2 bg-gray-700 text-gray-200 text-sm font-medium rounded hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500">
                      Change Password
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-red-400">Danger Zone</h3>
                    <p className="mt-1 text-sm text-gray-400">Permanently delete your account</p>
                    <button className="mt-4 px-4 py-2 bg-red-900 text-red-200 text-sm font-medium rounded hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

